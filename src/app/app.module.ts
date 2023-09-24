import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import '@angular/common/locales/global/pt';

import { AppComponent } from './app.component';
import { ExamplesPipesComponent } from './examples-pipes/examples-pipes.component';
import { CamelCasePipe } from './camel-case.pipe';
import { SettingsService } from './settings.service';

@NgModule({
  declarations: [AppComponent, ExamplesPipesComponent, CamelCasePipe],
  imports: [BrowserModule],
  providers: [
    // { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
      provide: LOCALE_ID,
      deps: [SettingsService],
      useFactory: (settingsServices: any) => settingsServices.getLocale(),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
