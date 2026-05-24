
'use client';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import { MalariaCase } from './types';

/**
 * Utility to export malaria cases to a PDF document.
 */
export async function exportCasesToPDF(cases: MalariaCase[], reportTitle: string = 'Malaria Surveillance Report') {
  const doc = new jsPDF();
  const dateStr = format(new Date(), 'yyyy-MM-dd HH:mm');

  // Add Title
  doc.setFontSize(18);
  doc.setTextColor(0, 86, 179); // Corporate Blue
  doc.text('PataMalaria | Health Information System', 14, 20);
  
  doc.setFontSize(12);
  doc.setTextColor(100);
  doc.text(reportTitle, 14, 30);
  doc.text(`Generated on: ${dateStr}`, 14, 38);

  const tableColumn = ["Case ID", "Patient Name", "Age/Sex", "Area", "Test", "Status", "Date"];
  const tableRows = cases.map(c => [
    c.id,
    c.patientName,
    `${c.age}Y/${c.gender[0]}`,
    c.area,
    c.testResult,
    c.status,
    format(new Date(c.reportedAt), 'MMM d, yyyy')
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 45,
    theme: 'striped',
    headStyles: { fillColor: [0, 86, 179], textColor: [255, 255, 255] },
    alternateRowStyles: { fillColor: [245, 247, 250] },
    margin: { top: 45 },
    styles: { fontSize: 9 }
  });

  doc.save(`patamalaria_report_${format(new Date(), 'yyyyMMdd_HHmm')}.pdf`);
}

/**
 * Utility to export a single case file.
 */
export function exportSingleCasePDF(caseItem: MalariaCase) {
  const doc = new jsPDF();
  
  doc.setFontSize(22);
  doc.setTextColor(0, 86, 179);
  doc.text('PATAMALARIA MEDICAL FILE', 105, 30, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setTextColor(150);
  doc.text(`Record ID: ${caseItem.id}`, 14, 45);
  doc.text(`Exported: ${format(new Date(), 'PPP p')}`, 14, 50);

  doc.setLineWidth(0.5);
  doc.setDrawColor(0, 86, 179);
  doc.line(14, 55, 196, 55);

  // Patient Info
  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.text('PATIENT IDENTIFICATION', 14, 70);
  
  doc.setFontSize(11);
  doc.text(`Full Name: ${caseItem.patientName}`, 14, 80);
  doc.text(`Age: ${caseItem.age} Years`, 14, 87);
  doc.text(`Gender: ${caseItem.gender}`, 14, 94);
  doc.text(`Contact: ${caseItem.contactNumber || 'N/A'}`, 14, 101);
  doc.text(`Reported Area: ${caseItem.area}`, 14, 108);

  // Diagnostic
  doc.setFontSize(14);
  doc.text('CLINICAL OVERVIEW', 14, 125);
  doc.setFontSize(11);
  doc.text(`RDT Result: ${caseItem.testResult}`, 14, 135);
  doc.text(`Current Status: ${caseItem.status}`, 14, 142);
  
  const symptoms = caseItem.symptoms.join(', ');
  const splitSymptoms = doc.splitTextToSize(`Symptoms: ${symptoms}`, 180);
  doc.text(splitSymptoms, 14, 149);

  if (caseItem.treatment) {
    doc.setFontSize(14);
    doc.setTextColor(220, 53, 69); // Red for treatment
    doc.text('PRESCRIBED TREATMENT', 14, 170);
    doc.setFontSize(11);
    doc.setTextColor(0);
    const splitTreatment = doc.splitTextToSize(caseItem.treatment, 180);
    doc.text(splitTreatment, 14, 180);
  }

  doc.save(`case_file_${caseItem.id}.pdf`);
}
