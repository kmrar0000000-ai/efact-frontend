import { Component } from '@angular/core';
import { DocumentsService } from '../../services/documents.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';


@Component({
  selector: 'app-documents',
  imports: [CommonModule, FormsModule],
  templateUrl: './documents.html',
  styleUrl: './documents.scss',
})
export class Documents {



  ticket = '571cc3a3-5b1f-4855-af26-0de6e7c5475f'; // ticket proporcionado en la prueba
  xmlContent: string | null = null;
  cdrContent: string | null = null;
  pdfUrl: SafeResourceUrl | null = null;
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private documentsService: DocumentsService,
    private sanitizer: DomSanitizer,
    private auth: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.auth.logout();           // borra el token
    this.router.navigate(['/login']); // redirige al login
  }
  

  // === BOTÓN PDF ===
  loadPdf(): void {
    if (!this.ticket) {
      this.errorMessage = 'Debe ingresar un ID de documento.';
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    this.xmlContent = null;
    this.cdrContent = null;

    this.documentsService.getPdf(this.ticket).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al obtener PDF', err);
        this.errorMessage = 'Error al obtener el PDF.';
        this.loading = false;
        this.pdfUrl = null;
      },
    });
  }

  // === BOTÓN XML ===
  loadXml(): void {
    this.pdfUrl = null;
    this.cdrContent = null;
    if (!this.ticket) {
      this.errorMessage = 'Debe ingresar un ID de documento.';
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    this.pdfUrl = null;
    this.cdrContent = null;

    this.documentsService.getXml(this.ticket).subscribe({
      next: (xml) => {
        this.xmlContent = xml;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al obtener XML', err);
        this.errorMessage = 'Error al obtener el XML.';
        this.loading = false;
        this.xmlContent = null;
      },
    });
  }

  // === BOTÓN CDR ===
  loadCdr(): void {
    this.pdfUrl = null;
    this.xmlContent = null;
    if (!this.ticket) {
      this.errorMessage = 'Debe ingresar un ID de documento.';
      return;
    }

    this.loading = true;
    this.errorMessage = null;
    this.pdfUrl = null;
    this.xmlContent = null;

    this.documentsService.getCdr(this.ticket).subscribe({
      next: (cdr) => {
        this.cdrContent = cdr;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al obtener CDR', err);
        this.errorMessage = 'Error al obtener el CDR.';
        this.loading = false;
        this.cdrContent = null;
      },
    });
  }


}
