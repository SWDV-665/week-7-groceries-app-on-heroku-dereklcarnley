import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GroceriesServiceService } from './groceries-service.service';

@Injectable({
  providedIn: 'root'
})
export class InputDialogServiceService {

  constructor(public dataService: GroceriesServiceService, public alertController: AlertController) { }

  async showPrompt(item?, index?) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: item ? 'Edit Item' : 'Add Item',
      message: item ? "Please edit item:" : 'Please enter item:',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name',
          value: item? item.name : null
        },
        {
          name: 'quantity',
          type: 'number',
          placeholder: '0',
          min: '0',
          value: item? item.quantity : null
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancel clicked');
          }
        }, {
          text: 'Save',
          handler: item => {
            console.log('Save clicked', item);
            if (index !== undefined) {
              this.dataService.editItem(item);
            } 
            else {
              this.dataService.addItem(item);
            };
          }
        }
      ]
    });

    await alert.present();
  };
}
