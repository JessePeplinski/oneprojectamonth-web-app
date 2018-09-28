import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { CollectionName } from '../constants/collection-name';

@Injectable({
  providedIn: 'root'
})
export class CrudService<T> {

  resource: AngularFirestoreDocument<T>;

  constructor(private afs: AngularFirestore) {
  }

  create<T>(collectionName: CollectionName, data: any) {
    let id = this.afs.createId();     // Generate a random id from angular firestore

    this.afs.collection(collectionName).doc(id).set(data)
      .then(function () {
        console.log("Document succesfully created with ID: " + id);
      }).catch(function (error) {
      console.error("Error creating document: " + error);
    });

  }

  read<T>(collectionName: CollectionName, id: string | number): Observable<T> {
    return this.afs.doc<T>(`${collectionName}/${id}`).valueChanges();
  }

  update(collectionName: CollectionName, id: string | number, data: any) {
    this.resource = this.afs.doc(`${collectionName}/${id}`);
    this.resource.update(data)
      .then(function () {
        console.log("Document succesfully updated with id: " + id);
      }).catch(function (error) {
      console.error("Error updating document: " + error);
    });
  }

  delete(collectionName: CollectionName, id: string | number) {
    console.log(`ID TO DELETE: ${id}`);
    this.resource = this.afs.doc(`${collectionName}/${id}`);
    this.resource.delete()
      .then(function () {
        console.log("Document succesfully deleted!")
      }).catch(function (error) {
      console.error("Error removing document: " + error);
    });
  }
}
