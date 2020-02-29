import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { motos } from '../model/motos.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private motosCollection: AngularFirestoreCollection<motos>;
  private motos: Observable<motos[]>;

  constructor(db: AngularFirestore) {
    this.motosCollection = db.collection<motos>('motos');
    this.motos = this.motosCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }
    ));
  }

  public getTodasMotos(){
    return this.motos;
  }

  public getMoto(id: string){
    return this.motosCollection.doc<motos>(id).valueChanges();
  }

  public updateMoto(moto: motos, id:string){
    return this.motosCollection.doc(id).update(moto);
  }

  public addMoto(moto: motos){
    return this.motosCollection.add(moto);
  }

  public removeMoto(id:string){
    return this.motosCollection.doc(id).delete();
  }

}
