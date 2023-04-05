import * as core from '@actions/core'
import {DescribeInstancesCommand, EC2Client} from '@aws-sdk/client-ec2'
import {loadConfig} from './config'
import {setOutput} from '@actions/core'

interface InstanceDetails {
  readonly instanceId: string
  readonly imageId?: string
  readonly instanceType?: string
  readonly privateDnsName?: string
  readonly privateIpAddress?: string
  readonly publicDnsName?: string
  readonly publicIpAddress?: string
  readonly state?: string
  readonly architecture?: string
  readonly instanceLifecycle?: string
  readonly json?: string
}

async function describeInstance(ec2Client: EC2Client, instanceId: string): Promise<InstanceDetails> {
  const command = new DescribeInstancesCommand({
    InstanceIds: [instanceId]
  })
  const output = await ec2Client.send(command)
  if (output.Reservations === undefined || output.Reservations.length === 0) {
    throw new Error('No instances found')
  }
  for (const reservation of output.Reservations) {
    if (reservation.Instances === undefined || reservation.Instances.length === 0) {
      throw new Error('No instances found')
    }
    for (const instance of reservation.Instances) {
      if (instance.InstanceId === undefined) {
        throw new Error('No instances found')
      }
      if (instance.InstanceId === instanceId) {
        return {
          instanceId: instance.InstanceId,
          imageId: instance.ImageId,
          instanceType: instance.InstanceType,
          privateDnsName: instance.PrivateDnsName,
          privateIpAddress: instance.PrivateIpAddress,
          publicDnsName: instance.PublicDnsName,
          publicIpAddress: instance.PublicIpAddress,
          state: instance.State?.Name,
          architecture: instance.Architecture,
          instanceLifecycle: instance.InstanceLifecycle,
          json: JSON.stringify(instance, null, 2)
        }
      }
    }
  }
  throw new Error('No instances found')
}

async function run(): Promise<void> {
  try {
    const config = loadConfig()
    const ec2Client = new EC2Client({region: config.region})
    const details = await describeInstance(ec2Client, config.instanceId)
    console.log(`Instance ID ${details.instanceId} found`)
    setOutput('instance-id', details.instanceId)
    setOutput('image-id', details.imageId)
    setOutput('instance-type', details.instanceType)
    setOutput('private-dns-name', details.privateDnsName)
    setOutput('private-ip-address', details.privateIpAddress)
    setOutput('public-dns-name', details.publicDnsName)
    setOutput('public-ip-address', details.publicIpAddress)
    setOutput('state', details.state)
    setOutput('architecture', details.architecture)
    setOutput('instance-lifecycle', details.instanceLifecycle)
    setOutput('json', details.json)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
