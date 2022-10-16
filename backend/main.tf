provider "aws" {
}

# S3 bucket

resource "aws_s3_bucket" "bucket" {
  force_destroy = "true"
  website {
    index_document = "index.html"
  }
}

resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.bucket.id

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "${aws_s3_bucket.bucket.arn}/*"
    }
  ]
}
POLICY
}

resource "aws_s3_bucket_object" "object" {
  key          = "index.html"
  content      = file("index.html")
  bucket       = aws_s3_bucket.bucket.bucket
  content_type = "text/html"
}

resource "aws_s3_bucket_object" "api_object" {
  key     = "api.yaml"
  content = templatefile("src/openapi.yml", { api_url = aws_apigatewayv2_api.api.api_endpoint })
  bucket  = aws_s3_bucket.bucket.bucket
}

# DDB

resource "aws_dynamodb_table" "orders_table" {
  name         = "orders-${random_id.id.hex}"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }
}

# Lambda function

resource "random_id" "id" {
  byte_length = 8
}

data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = "${path.module}/dist/"
  output_path = "${path.module}/temp/deploy.zip"
}

resource "aws_lambda_function" "lambda" {
  function_name = "api_example-${random_id.id.hex}-function"

  filename         = data.archive_file.lambda_zip.output_path
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256

  handler     = "dist/index.handler"
  runtime     = "nodejs16.x"
  role        = aws_iam_role.lambda_exec.arn
  timeout     = 10
  memory_size = 256
  environment {
    variables = {
      DYNAMODB_ORDERS_TABLE = aws_dynamodb_table.orders_table.id
    }
  }
}

data "aws_iam_policy_document" "lambda_exec_role_policy" {
  statement {
    actions = [
      "dynamodb:Scan",
      "dynamodb:PutItem",
      "dynamodb:GetItem",
      "dynamodb:UpdateItem",
      "dynamodb:DeleteItem",
    ]
    resources = [
      aws_dynamodb_table.orders_table.arn,
    ]
  }
  statement {
    actions = [
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ]
    resources = [
      "arn:aws:logs:*:*:*"
    ]
  }
}

resource "aws_cloudwatch_log_group" "loggroup" {
  name              = "/aws/lambda/${aws_lambda_function.lambda.function_name}"
  retention_in_days = 14
}

resource "aws_iam_role_policy" "lambda_exec_role" {
  role   = aws_iam_role.lambda_exec.id
  policy = data.aws_iam_policy_document.lambda_exec_role_policy.json
}

resource "aws_iam_role" "lambda_exec" {
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
	{
	  "Action": "sts:AssumeRole",
	  "Principal": {
		"Service": "lambda.amazonaws.com"
	  },
	  "Effect": "Allow"
	}
  ]
}
EOF
}

# API Gateway

resource "aws_apigatewayv2_api" "api" {
  name          = "api-${random_id.id.hex}"
  protocol_type = "HTTP"
  target        = aws_lambda_function.lambda.arn
  cors_configuration {
    allow_origins = ["*"]
    allow_methods = ["GET", "POST", "PUT", "DELETE"]
    allow_headers = ["Content-Type"]
  }
}

resource "aws_lambda_permission" "apigw" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda.arn
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.api.execution_arn}/*/*"
}

output "url" {
  value = aws_s3_bucket.bucket.website_endpoint
}

output "api_url" {
  value = aws_apigatewayv2_api.api.api_endpoint
}
