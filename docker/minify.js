import fs from 'fs-extra'
import path from 'path'
import { nodeFileTrace } from '@vercel/nft'

function readFile(basePath, path, filesList) {
  try {
    const files = fs.readdirSync(path)
    files.forEach(walk)
    function walk(file) {
      const states = fs.statSync(path + '/' + file)
      if (states.isDirectory()) {
        readFile(basePath, path + '/' + file, filesList)
      } else {
        filesList.push(path + '/' + file)
      }
    }
  } catch (e) {
    if (e.message.includes('no such file or directory')) {
      return
    }
    throw e
  }
}
function getFilesAndFoldersInDir(dir) {
  const basePath = path.join(process.cwd(), `${dir}`)
  const filesList = []
  readFile(basePath, basePath, filesList)
  return filesList
}
// !!! if any new dependencies are added, update the Dockerfile !!!
;(async () => {
  const projectRoot = path.resolve(process.env.PROJECT_ROOT || path.join(process.cwd(), './'))
  const resultFolder = path.join(projectRoot, 'dist') // no need to resolve, ProjectRoot is always absolute
  const filesAll = getFilesAndFoldersInDir('dist')
  const files = [...filesAll]
  console.log('Start analyzing, project root:', projectRoot)
  const { fileList: fileSet } = await nodeFileTrace(files, {
    base: projectRoot,
    paths: {
      '@/': 'dist/',
    },
    exports: [],
  })
  let fileList = Array.from(fileSet)
  console.log('Total touchable files:', fileList.length)
  fileList = fileList.filter((file) => file.startsWith('node_modules')) // only need node_modules
  console.log('Total files need to be copied (touchable files in node_modules):', fileList.length)
  console.log('Start copying files, destination:', resultFolder)
  return Promise.all(
    fileList.map((e) =>
      fs.copy(path.join(projectRoot, e), path.join(resultFolder, e)).catch(console.error),
    ),
  )
})().catch((err) => {
  // fix unhandled promise rejections
  console.error(err, err.stack)
  process.exit(1)
})
