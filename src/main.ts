import { importProvidersFrom } from '@angular/core';
import { getAnalytics, provideAnalytics } from '@angular/fire/analytics';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter } from '@angular/router';
import 'firebase/auth';
import { AppComponent } from "./app/app.component";
import { routes } from './app/route/models/app-routing';
import { environment } from "./environments/environment";

//=>import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; => Import Angular Bootstrap



bootstrapApplication(AppComponent,
  {providers:
    [
      provideRouter(routes),
      importProvidersFrom(
        provideFirebaseApp(() => initializeApp( environment.firebaseConfig )), //=>For Initialize The Firebase Services With The App.
        provideAuth(() => getAuth()), //=>For Firebase Authentication.
        provideAnalytics(() => getAnalytics()), //=>For Firebase Analytics.
        provideDatabase(() => getDatabase()), //=>For Firebase Database.
        provideFirestore(() => getFirestore()), //=>For FireStore.
        AngularFireModule.initializeApp( environment.firebaseConfig ),
      ),
    ],
  }
);



