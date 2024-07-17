import * as path from 'node:path'
import { createConfigService } from '../config-service'

const testDirectory = path.resolve(__dirname, 'fixtures')

describe('config service', () => {
  const subject = createConfigService()
  const filepath = path.join(testDirectory, 'package.json')

  describe('readConfig', () => {
    it('should load ".typesyncrc"', async () => {
      const config = await subject.readConfig(filepath, {})

      expect(config.ignoreDeps).toEqual(['dev'])
      expect(config.ignorePackages).toEqual(['package1'])
    })

    it('should read from cli args', async () => {
      const config = await subject.readConfig(filepath, {
        ignoredeps: 'dev',
        ignorepackages: 'package1',
      })
      expect(config.ignoreDeps).toEqual(['dev'])
      expect(config.ignorePackages).toEqual(['package1'])
    })

    it('should merge cli args with file config', async () => {
      const config = await subject.readConfig(filepath, {
        ignoredeps: 'peer',
      })
      expect(config.ignoreDeps).toEqual(['peer'])
      expect(config.ignorePackages).toEqual(['package1'])
    })
  })
})
