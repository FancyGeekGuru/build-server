#!/usr/bin/env ts-node

import * as path from 'path'
import { spawn } from 'child_process'
import { env } from 'decentraland-commons'

export function migrate(
  commandArguments: string[],
  migrationsDir: string = __dirname
) {
  const CONNECTION_STRING = env.get('CONNECTION_STRING', 'postgres://yhutgsjqgycxla:b9b37bc0a18e1831bb3ee9c1f7c1e88b0ad90820385f193a0eb9fce28ab9e220@ec2-44-209-186-51.compute-1.amazonaws.com:5432/d20ujcgicqq1rm')
  if (!CONNECTION_STRING) {
    throw new Error(
      'Please set a CONNECTION_STRING env variable before running migrations'
    )
  }

  const spawnArgs = [
    '--database-url-var',
    'CONNECTION_STRING',
    '--migration-file-language',
    'ts',
    '--migrations-dir',
    migrationsDir,
    '--ignore-pattern',
    '\\..*|.*migrate(.ts)?',
    ...commandArguments,
  ]

  console.log('Running command:')
  console.dir(`node-pg-migrate ${spawnArgs.join(' ')}`)

  const child = spawn(
    'node-pg-migrate',
    spawnArgs,
    {
      env: { ...process.env, CONNECTION_STRING },
    }
  )

  child.on('error', function (error) {
    console.log(error.message)
  })

  child.stdout.on('data', function (data) {
    console.log(data.toString())
  })

  child.stderr.on('data', function (data) {
    console.log(data.toString())
  })

  child.on('close', (code: number, signal: string) => {
    console.log(`child process exited with code: ${code} and signal: ${signal}`)
  })

  return child
}

if (require.main === module) {
  migrate(process.argv.slice(2), path.resolve(__dirname, '../migrations'))
}
