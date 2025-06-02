import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { Button } from '@consta/uikit/Button';


export default function Page() {
  return (
    <Theme preset={presetGpnDefault}>
      <Button label="Кнопка" />
    </Theme>
  )
}
