import { Component, OnInit, Input } from '@angular/core';
import jsPDF from 'jspdf';

@Component({
  selector: 'view-slide',
  templateUrl: './view-slide.component.html',
  styleUrls: ['./view-slide.component.scss'],
})
export class ViewSlideComponent implements OnInit {
  @Input() images: any = [];

  doc: any;

  constructor() {
  }

  ngOnInit() { }

  ngOnChanges() {
    if (this.images?.length > 0) {
      console.log(this.images);
      this.doc = new jsPDF({ compress: true });
      for (let index = 0; index < this.images.length; index++) {
        index > 0 ? this.doc.addPage() : '';
        this.doc.addImage(this.images[index].url, 'png', 15, 40, 180, 160);
      }
      this.doc.setProperties({
        title: "jsPDF sample"
      });
      // this.doc.save( 'file.pdf');
      let dataSrc = this.doc.output("blob");
      let blob_url = URL.createObjectURL(dataSrc);
      var iframeElementContainer: any = document.getElementById('iframe');
      iframeElementContainer.src = blob_url;
    }
  }

  downloadPDF() {
    this.doc.save('file.pdf');
  }

}
