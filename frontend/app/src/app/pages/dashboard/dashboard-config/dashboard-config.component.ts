import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {
  DashboardConfigService,
  HealthCheck,
} from './dashboard-config.service';
import { HttpClientModule } from '@angular/common/http';
import { Subscription, catchError, interval, of } from 'rxjs';
import { CardsComponentComponent } from '../../../components/ui/cards/cards-component/cards-component.component';
import { IconSettingsComponent } from '../../../components/icon/icon-settings/icon-settings.component';
import { CardData } from '../../../components/ui/cards/cards-component/cards-component.model';
import { CardsComponentContentComponent } from '../../../components/ui/cards/cards-component/cards-component-content/cards-component-content.component';

@Component({
  selector: 'app-dashboard-config',
  standalone: true,
  imports: [CardsComponentComponent, IconSettingsComponent],
  providers: [
    DashboardConfigService,
    HttpClientModule,
    CardsComponentComponent,
    CardsComponentContentComponent,
  ],
  templateUrl: './dashboard-config.component.html',
  styleUrl: './dashboard-config.component.css',
})
export class DashboardConfigComponent implements OnInit, OnDestroy {
  url = environment.apiUrl;
  isAvailable: boolean = false;
  private healthCheckSubscription!: Subscription;
  counter: number = 6;

  data: CardData = {
    title: 'Configuracion e informacion de la aplicacion',
    description:
      'Podras ver y modificar diferentes secciones de la aplicacion, ten cuidado modificar erroneamente alguno de los datos podria llegar a causar problemas en el servidor o cliente.',
    descriptionIcon: 'warning',
    icon: 'settings',
    children: [
      {
        title: 'Revisar estado de servicios',
        description:
          'Aqui podras revisar el estado de los diferentes servicios consumidos por el cliente.',
        icon: 'info',
        descriptionIcon: 'server',
        children: [
          {
            title: 'Python services',
            descriptionIcon: 'server',
            description:
              'Este es el core de los servicios de nuestra aplicacion web, aqui podras visualizar informacion acerca de este.',
            content: {
              title: 'principal aws ec2 instance',
              description: 'server: ' + this.url,
              isAvailable: false,
            },
          },
        ],
      },
    ],
  };

  constructor(private _dashboardConfigService: DashboardConfigService) {}

  startCounter() {
    this.counter = 6;
    const intervalId = setInterval(() => {
      this.counter--;
      if (this.counter === 0) {
        clearInterval(intervalId);
        this.counter = 6;
      }
    }, 1000);
  }

  ngOnInit(): void {
    this.healthCheck();
    this.startCounter();
    this.healthCheckSubscription = interval(6000).subscribe(() => {
      this.healthCheck();
      this.startCounter();
    });
  }
  ngOnDestroy(): void {
    if (this.healthCheckSubscription) {
      this.healthCheckSubscription.unsubscribe();
    }
  }

  // agreegar a futuro una mejor manera de setear los datos en this.data.children[0].children[0].content[0].isAvailable y this.data.children[0].children[0].content[1].isAvailable
  // para que no se vea tan feo
  healthCheck() {
    this._dashboardConfigService
      .healthCheck()
      .pipe(
        catchError((error: HealthCheck) => {
          console.error('Health check failed:', error);
          this.isAvailable = false;
          return of({ status: 'unhealthy' }); // Retorna un observable
        })
      )
      .subscribe((data: HealthCheck) => {
        if (data.status === 'healthy') {
          this.isAvailable = true;
          if (
            this.data.children &&
            this.data.children[0].children &&
            this.data.children[0].children[0].content
          ) {
            this.data.children[0].children[0].content.isAvailable = true;
          }
        } else {
          this.isAvailable = false;
          if (
            this.data.children &&
            this.data.children[0].children &&
            this.data.children[0].children[0].content
          ) {
            this.data.children[0].children[0].content.isAvailable = false;
          }
        }
        console.log(data);
      });
  }
}
