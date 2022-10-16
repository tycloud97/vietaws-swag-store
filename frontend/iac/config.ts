import { Construct } from 'constructs'

const config = {
  dev: {
    domain: 'bebi.store',
  },
}


export const getConfig = (scope?: Construct) => {
  const stage = 'dev'

  return {
    domain: scope?.node.tryGetContext('domain') ?? config[stage].domain,
  }
}
