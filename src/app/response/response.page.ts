import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RESTServices } from '../rest/rest.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ToastController } from '@ionic/angular';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-response',
  templateUrl: './response.page.html',
  styleUrls: ['./response.page.scss'],
})
export class ResponsePage implements OnInit {
  response = {courier_status:'',comment:'',app_type:'',tx_type:''}
  jobDetails: any;
  responseID: string;
  encodeData: any;
  qrData: string;
  scannedCode = null;
  pdfObj = null;;
  receiver: any;
  qrImageData: any;
  elementType: 'url' | 'canvas' | 'img' = 'canvas';

  
  constructor(private router: Router, private toastController: ToastController, private storage: Storage, private file: File, private fileOpener: FileOpener,
    private platform: Platform, private route: ActivatedRoute, private restService: RESTServices, private barcodeScanner: BarcodeScanner, private base64ToGallery: Base64ToGallery) {
    this.responseID = route.snapshot.params['id'];
  
   }

   
ngOnInit() {
 this.restService.getPackgeDetails(this.responseID).then(response =>{
 this.jobDetails = response;
 this.qrData = this.responseID;
 this.jobDetails.client_details.receiver_details.forEach(element => {
 this.receiver = element;   
   });
 })

  }

  // getQRdata(){
  //   const canvas = document.querySelector('canvas') as HTMLCanvasElement;
  //   this.qrImageData = canvas.toDataURL('image/jpeg').toString();
  //   console.log(this.qrImageData);


  // }
 

 courierAcceptUpdate(){
  this.response.courier_status="accept";
  this.response.app_type="courier_app"
  this.response.tx_type="in"
  this.restService.setCourierAcceptions(this.responseID, this.response).then(response =>{
    console.log(response)
    this.acceptToast();
    this.router.navigate(['/courier/my-job/']);
    
  })

  const canvas = document.querySelector('canvas') as HTMLCanvasElement;
  this.qrImageData = canvas.toDataURL('image/jpeg').toString();
 
  this.createPdf();


   }
   
 courierCancelUpdate(){
  this.router.navigate(['/courier/my-job/']);
   
  }


  createPdf() {   
    var docDefinition = {
      pageSize: {
        width: 250,
        height: 380
      },
      content: [
        { text: 'Citypack Courier Service', style: 'header' },
        { text: new Date().toTimeString(), alignment: 'left',  style: 'subheader' },
        { text: 'Job ID', style: 'subheader', margin: [0, 2, 0, 0]},
        { text: this.responseID,  style: 'subheader', margin: [0, 2, 0, 0]},
        { text: 'Delevery Details', style: 'subheader', margin: [0, 3, 0, 0] },
        { text: 'From', style: 'subheader', margin: [0, 2, 0, 0] },
        { text: this.jobDetails.client_details.first_name+' '+this.jobDetails.client_details.last_name+', '+this.jobDetails.client_details.current_address+'.',  style: 'subheader', margin: [0, 2, 0, 0]},
        {text: this.jobDetails.client_details.contact,  style: 'subheader', margin: [0, 2, 0, 0]},
        { text: 'To', style: 'subheader', margin: [0, 2, 0, 0]},
        {text: this.receiver.first_name+' '+this.receiver.last_name+' ,'+this.receiver.address+'.', style: 'subheader', margin: [0, 2, 0, 0]},
        {text: this.receiver.contact,  style: 'subheader', margin: [0, 2, 0, 0]},
       
        {
          layout: 'lightHorizontalLines',margin: [0, 2, 0, 0],
          table: {
            headerRows: 1,
            widths: [ '*' ],
    
            body: [
              [ { text: 'QR Data',  bold: true,  style: 'subheader', margin: [0, 2, 0, 0] }],
              [ {image: this.qrImageData, width: 80,
                height: 80}],
              [ { text: 'Packge details: please past QR code on parcel', bold: true,  style: 'subheader', margin: [0, 2, 0, 0]}]
            ]
          }
        },
 
        
       ],
      styles: {
        header: {
          fontSize: 10,
          bold: true,
        },
        subheader: {
          fontSize: 8,
          bold: true,
          margin: [0, 5, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);

    if (this.platform.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' }); 
        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'tag.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'tag.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
    
  
  }

  async acceptToast() {
    const toast = await this.toastController.create({
      message: 'Client request accepted.',
      duration: 2000
    });
    toast.present();
  }


}
