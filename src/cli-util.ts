import chalk from 'chalk'
import { ICLIArguments } from './types'
import ora from 'ora'

/**
 * Like regular console.log, but better.
 * @param message
 */
export function log(message: string) {
  console.log(`${chalk.white('»')}  ${chalk.gray(message)}`)
}

/**
 * Makes success feel even sweeter.
 * @param text
 */
export function success(text: string) {
  console.log(`${chalk.green('✔')}  ${chalk.white(text)}`)
}

/**
 * Logs an error all pretty.
 * @param err
 */
export function error(err: Error | string) {
  const msg = err instanceof Error ? err.message : err
  const stack = err instanceof Error ? `\nStack:\n${err.stack}` : ''
  console.log(`${chalk.red('✖')}  ${chalk.bgRed(chalk.white(msg))}${stack}`)
}

/**
 * Spins while doing work. Stops when done.
 * @param text
 * @param fn
 */
export async function spinWhile<T>(text: string, fn: () => Promise<T>) {
  const spinner = ora(' ' + chalk.gray(text)).start()
  try {
    return await fn()
  } finally {
    spinner.stop()
  }
}

/**
 * Super simple argument parser.
 * @param argv
 */
export function parseArguments(argv: Array<string>): ICLIArguments {
  const flags: ICLIArguments['flags'] = {}
  const args: Array<string> = []
  for (const arg of argv) {
    if (arg.startsWith('--')) {
      if (arg.includes('=')) {
        const idx = arg.indexOf('=')
        const afterEq = arg.substring(idx + 1)
        flags[arg.substring(2, idx)] = afterEq
      } else {
        flags[arg.substring(2)] = true
      }
    } else {
      args.push(arg)
    }
  }
  return { flags, args }
}
