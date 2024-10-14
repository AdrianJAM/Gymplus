import { IconServerComponent } from './icon-server/icon-server.component';
import { IconSettingsComponent } from './icon-settings/icon-settings.component';
import { IconWarningComponent } from './icon-warning/icon-warning.component';

export const ICON_COMPONENTS: { [key: string]: any } = {
  settings: IconSettingsComponent,
  server: IconServerComponent,
  warning: IconWarningComponent,
};
