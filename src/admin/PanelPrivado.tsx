import { Acceso } from './Acceso'
import PanelAdmin from './PanelAdmin'

/**
 * El panel con su puerta delante. Es lo único que la tienda carga cuando la
 * dirección es `#/panel`, para que clave y panel viajen en el mismo trozo
 * aparte y nunca en la descarga del cliente.
 */
export default function PanelPrivado() {
  return (
    <Acceso>
      <PanelAdmin />
    </Acceso>
  )
}
