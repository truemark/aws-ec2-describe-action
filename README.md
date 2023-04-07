# AWS EC2 Describe Instance Action

[![LICENSE](https://img.shields.io/badge/license-BSD3-green)](LICENSE)
[![Latest Release](https://img.shields.io/github/v/release/truemark/aws-ec2-describe-instance-action)](https://github.com/truemark/aws-ec2-describe-instance-action/releases)
![GitHub closed issues](https://img.shields.io/github/issues-closed/truemark/aws-ec2-describe-instance-action)
![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/truemark/aws-ec2-describe-instance-action)
![build-test](https://github.com/truemark/aws-ec2-describe-instance-action/workflows/build-test/badge.svg)

This GitHub action will describe an EC2 instance and output the details

## Example

```yml
      - name: Describe arm64 Instance
        id: ec2-describe-arm64
        uses: truemark/aws-ec2-describe-instance-action@v2
        with:
          instance-id: ${{ steps.ec2-arm64.outputs.instance-id }}
          region: "us-east-2"
```

## Inputs

| Name                             | Type       | Required | Description             |
|----------------------------------|------------|----------|-------------------------|
| instance-id                      | string     | Yes      | Instance ID to describe |
| region                           | string     | Yes      | AWS region to use       |

## Outputs

| Name                     | Type       | Description                                |
|--------------------------|------------|--------------------------------------------|
| instance-id              | string     | The instance ID of the EC2 instance        |
| image-id                 | string     | The AMI used to launch the instance        |
| instance-type            | string     | The instance type of the EC2 instance      |
| private-dns-name         | string     | The private DNS name of the EC2 instance   |
| private-ip-address       | string     | The private IP address of the EC2 instance |
| public-dns-name          | string     | The public DNS name of the EC2 instance    |
| public-ip-address        | string     | The public IP address of the EC2 instance  |
| state                    | string     | The state of the EC2 instance              |
| architecture             | string     | The architecture of the EC2 instance       |
| instance-lifecycle       | string     | The instance lifecycle of the EC2 instance |
| json                     | string     | The full JSON response from the API        |

## Development

> Install `node version 16`

Install the dependencies
```bash
$ npm install
```

Build the typescript and package it for distribution
```bash
$ npm run build && npm run package
```

Run the tests :heavy_check_mark:
```bash
$ npm test
```
