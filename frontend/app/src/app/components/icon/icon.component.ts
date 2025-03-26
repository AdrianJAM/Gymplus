import {
  Component,
  Input,
  ViewContainerRef,
  ComponentFactoryResolver,
  Injector, OnChanges,
  Type,
} from '@angular/core';
import { IconServerComponent } from './icon-server/icon-server.component';
import { IconWarningComponent } from './icon-warning/icon-warning.component';
import { IconSettingsComponent } from './icon-settings/icon-settings.component';
import { IconExcelComponent } from './icon-excel/icon-excel.component';

@Component({
  selector: 'app-icon-loader',
  standalone: true,
  template: `<ng-container #iconContainer></ng-container>`,
})
export class IconLoaderComponent implements OnChanges {
  @Input() iconName!: string;

  private iconMap: { [key: string]: Type<unknown> } = {
    warning: IconWarningComponent,
    server: IconServerComponent,
    settings: IconSettingsComponent,
    excel: IconExcelComponent,
  };

  constructor(
    private viewContainerRef: ViewContainerRef,
    private injector: Injector,
    private cfr: ComponentFactoryResolver
  ) {}

  ngOnChanges(): void {
    this.loadIcon();
  }

  loadIcon() {
    const iconComponent = this.iconMap[this.iconName];
    if (iconComponent) {
      const factory = this.cfr.resolveComponentFactory(iconComponent);
      this.viewContainerRef.clear();
      this.viewContainerRef.createComponent(factory, undefined, this.injector);
    }
  }
}
