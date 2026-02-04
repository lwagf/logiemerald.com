import { useEffect, useRef } from 'react'

declare global {
  // This is a global variable that is defined in the RomPatcher.webapp.js file
  const RomPatcherWeb: {
    initialize: (options: Record<string, unknown>, patch: Record<string, unknown>) => void
  }
}

const SCRIPT_ID = 'rom-patcher-webapp-script'

function initializePatcher() {
  if (!RomPatcherWeb?.initialize) return false

  try {
    RomPatcherWeb.initialize(
      {
        language: 'en',
        requireValidation: true,
      },
      {
        file: '/patch/patches.zip',
        patches: [
          {
            file: 'logi-emerald-v0.2b.bps',
            name: 'Logi Emerald v0.2b',
            inputMd5: '605b89b67018abcea91e693a4dd25be3',
            description: 'v0.2 Beta',
            outputName: 'Logi Emerald v0.2b',
          },
          {
            file: 'logi-emerald-v0.1b.bps',
            name: 'Logi Emerald v0.1b',
            inputMd5: '605b89b67018abcea91e693a4dd25be3',
            description: 'v0.1 Beta',
            outputName: 'Logi Emerald v0.1b',
          }
        ]
      }
    )
    return true
  } catch {
    // Already initialized or other error
    return true
  }
}

interface RomPatcherProps {
  isActive: boolean
}

export function RomPatcher({ isActive }: RomPatcherProps) {
  const initialized = useRef(false)

  useEffect(() => {
    // Only initialize when active and not already initialized
    if (!isActive || initialized.current) return

    const existingScript = document.getElementById(SCRIPT_ID)

    if (existingScript) {
      // Script already in DOM - wait for RomPatcherWeb to be available
      initialized.current = true

      const checkAndInit = () => {
        if (initializePatcher()) return
        // Retry after a short delay if not ready
        setTimeout(checkAndInit, 50)
      }

      // Small delay to ensure DOM is ready
      setTimeout(checkAndInit, 10)
      return
    }

    initialized.current = true

    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src = '/rom-patcher-js/RomPatcher.webapp.js'
    script.async = true
    script.onload = () => {
      // Small delay to ensure script has executed
      setTimeout(() => {
        if (!initializePatcher()) {
          const container = document.getElementById('rom-patcher-container')
          if (container) {
            container.innerHTML = 'Failed to initialize ROM Patcher'
            container.style.color = 'red'
          }
        }
      }, 10)
    }
    script.onerror = () => {
      const container = document.getElementById('rom-patcher-container')
      if (container) {
        container.innerHTML = 'Failed to load ROM Patcher script'
        container.style.color = 'red'
      }
    }
    document.body.appendChild(script)
  }, [isActive])

  return (
    <>
      <div id="rom-patcher-container">
        <div className="form-note">
          <a href="https://mgba.io/" target="_blank" rel="noopener noreferrer">
            mGBA is recommended
          </a>
        </div>
        <div className="rom-patcher-row margin-bottom" id="rom-patcher-row-file-rom">
          <div className="text-right">
            <label htmlFor="rom-patcher-input-file-rom">ROM file:</label>
          </div>
          <div className="rom-patcher-container-input">
            <input type="file" id="rom-patcher-input-file-rom" className="empty" disabled />
          </div>
        </div>
        <div className="margin-bottom text-selectable text-mono text-muted" id="rom-patcher-rom-info">
          <div className="rom-patcher-row">
            <div className="text-right">CRC32:</div>
            <div className="text-truncate">
              <span id="rom-patcher-span-crc32"></span>
            </div>
          </div>
          <div className="rom-patcher-row">
            <div className="text-right">MD5:</div>
            <div className="text-truncate">
              <span id="rom-patcher-span-md5"></span>
            </div>
          </div>
          <div className="rom-patcher-row">
            <div className="text-right">SHA-1:</div>
            <div className="text-truncate">
              <span id="rom-patcher-span-sha1"></span>
            </div>
          </div>
          <div className="rom-patcher-row" id="rom-patcher-row-info-rom">
            <div className="text-right">ROM:</div>
            <div className="text-truncate">
              <span id="rom-patcher-span-rom-info"></span>
            </div>
          </div>
        </div>

        <div className="rom-patcher-row margin-bottom" id="rom-patcher-row-file-patch">
          <div className="text-right">
            <label htmlFor="rom-patcher-input-file-patch">Patch file:</label>
          </div>
          <div className="rom-patcher-container-input">
            <select id="rom-patcher-select-patch"></select>
          </div>
        </div>
        <div className="rom-patcher-row margin-bottom" id="rom-patcher-row-patch-description">
          <div className="text-right text-mono text-muted">Description:</div>
          <div className="text-truncate" id="rom-patcher-patch-description"></div>
        </div>
        <div
          className="rom-patcher-row margin-bottom text-selectable text-mono text-muted"
          id="rom-patcher-row-patch-requirements"
        >
          <div className="text-right text-mono" id="rom-patcher-patch-requirements-type">
            ROM requirements:
          </div>
          <div className="text-truncate" id="rom-patcher-patch-requirements-value"></div>
        </div>

        <div className="text-center" id="rom-patcher-row-apply">
          <div id="rom-patcher-row-error-message" className="margin-bottom">
            <span id="rom-patcher-error-message"></span>
          </div>
          <button id="rom-patcher-button-apply" disabled>
            Apply patch
          </button>
        </div>
      </div>

      <div id="rom-patcher-powered" className="text-center">
        <a href="https://github.com/marcrobledo/RomPatcher.js" target="_blank" rel="noopener noreferrer">
          <img src="/rom-patcher-js/assets/powered_by_rom_patcher_js.png" loading="lazy" alt="" />
          Powered by Rom Patcher JS
        </a>
      </div>
    </>
  )
}
