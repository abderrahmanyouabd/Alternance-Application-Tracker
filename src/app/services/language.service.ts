import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Translations {
  [key: string]: {
    en: string;
    fr: string;
  };
}

export const TRANSLATIONS: Translations = {
  // Navigation & Titles
  'job_tracker_title': {
    en: 'Job Tracker',
    fr: 'Suivi de Candidatures'
  },
  'add_application': {
    en: 'Add Application',
    fr: 'Ajouter une candidature'
  },
  'view_applications': {
    en: 'View Applications',
    fr: 'Voir les candidatures'
  },
  'add_new_application': {
    en: 'Add New Application',
    fr: 'Nouvelle candidature'
  },

  // Language switcher
  'lang_en': {
    en: 'EN',
    fr: 'EN'
  },
  'lang_fr': {
    en: 'FR',
    fr: 'FR'
  },

  // Form Labels & Placeholders
  'company_name': {
    en: 'Company Name',
    fr: 'Nom de l\'entreprise'
  },
  'enter_company_name': {
    en: 'Enter company name',
    fr: 'Entrez le nom de l\'entreprise'
  },
  'status': {
    en: 'Status',
    fr: 'Statut'
  },
  'job_url': {
    en: 'Job Description URL',
    fr: 'URL de l\'offre'
  },
  'enter_job_url': {
    en: 'Enter job posting URL',
    fr: 'Entrez l\'URL de l\'offre'
  },
  'cv': {
    en: 'CV',
    fr: 'CV'
  },
  'cover_letter': {
    en: 'Cover Letter',
    fr: 'Lettre de motivation'
  },
  'no_file_chosen': {
    en: 'No file chosen',
    fr: 'Aucun fichier choisi'
  },
  'choose_file': {
    en: 'Choose file',
    fr: 'Choisir un fichier'
  },

  // Buttons
  'add_application_button': {
    en: 'Add Application',
    fr: 'Ajouter la candidature'
  },

  // Status Options
  'pending': {
    en: 'Pending',
    fr: 'En attente'
  },
  'applied': {
    en: 'Applied',
    fr: 'Postulé'
  },
  'interview': {
    en: 'Interview',
    fr: 'Entretien'
  },
  'rejected': {
    en: 'Rejected',
    fr: 'Refusé'
  },
  'accepted': {
    en: 'Accepted',
    fr: 'Accepté'
  },
  'to_apply': {
    en: 'To Apply',
    fr: 'À postuler'
  },

  // Buttons & Actions
  'add': {
    en: 'Add',
    fr: 'Ajouter'
  },
  'edit': {
    en: 'Edit',
    fr: 'Modifier'
  },
  'delete': {
    en: 'Delete',
    fr: 'Supprimer'
  },
  'cancel': {
    en: 'Cancel',
    fr: 'Annuler'
  },
  'update': {
    en: 'Update',
    fr: 'Mettre à jour'
  },
  'clear_filters': {
    en: 'Clear Filters',
    fr: 'Effacer les filtres'
  },
  'export_excel': {
    en: 'Export to Excel',
    fr: 'Exporter vers Excel'
  },

  // Table Headers
  'company': {
    en: 'Company',
    fr: 'Entreprise'
  },
  'actions': {
    en: 'Actions',
    fr: 'Actions'
  },

  // Links & Labels
  'view_description': {
    en: 'View Description',
    fr: 'Voir la description'
  },
  'view_cv': {
    en: 'View CV',
    fr: 'Voir le CV'
  },
  'view_cover_letter': {
    en: 'View Cover Letter',
    fr: 'Voir la lettre de motivation'
  },
  'not_uploaded': {
    en: 'Not uploaded',
    fr: 'Non téléchargé'
  },

  // Filter Labels
  'filter_by_status': {
    en: 'Filter by Status',
    fr: 'Filtrer par statut'
  },
  'filter_by_company': {
    en: 'Filter by Company',
    fr: 'Filtrer par entreprise'
  },

  // Messages
  'confirm_delete': {
    en: 'Are you sure you want to delete this application?',
    fr: 'Êtes-vous sûr de vouloir supprimer cette candidature ?'
  },
  'application_added': {
    en: 'Application added successfully',
    fr: 'Candidature ajoutée avec succès'
  },
  'application_updated': {
    en: 'Application updated successfully',
    fr: 'Candidature mise à jour avec succès'
  },
  'application_deleted': {
    en: 'Application deleted successfully',
    fr: 'Candidature supprimée avec succès'
  },
  'error_loading': {
    en: 'Error loading applications',
    fr: 'Erreur lors du chargement des candidatures'
  },
  'error_adding': {
    en: 'Error adding application',
    fr: 'Erreur lors de l\'ajout de la candidature'
  },
  'error_updating': {
    en: 'Error updating application',
    fr: 'Erreur lors de la mise à jour de la candidature'
  },
  'error_deleting': {
    en: 'Error deleting application',
    fr: 'Erreur lors de la suppression de la candidature'
  },
  'no_applications': {
    en: 'No applications to export',
    fr: 'Aucune candidature à exporter'
  },
  'export_success': {
    en: 'Applications exported successfully',
    fr: 'Candidatures exportées avec succès'
  },
  'export_error': {
    en: 'Error exporting applications',
    fr: 'Erreur lors de l\'exportation des candidatures'
  },

  // Footer
  'created_by': {
    en: 'Created by',
    fr: 'Créé par'
  },
  'all_rights_reserved': {
    en: 'All rights reserved',
    fr: 'Tous droits réservés'
  },

  // Form validation messages
  'field_required': {
    en: 'This field is required',
    fr: 'Ce champ est obligatoire'
  },
  'invalid_url': {
    en: 'Please enter a valid URL',
    fr: 'Veuillez entrer une URL valide'
  },
  'file_type_error': {
    en: 'Only PDF, DOC and DOCX files are allowed',
    fr: 'Seuls les fichiers PDF, DOC et DOCX sont autorisés'
  },

  'all_statuses': {
    en: 'All Statuses',
    fr: 'Tous les statuts'
  },
  'edit_application': {
    en: 'Edit Application',
    fr: 'Modifier la candidature'
  },
  'optional': {
    en: 'Optional',
    fr: 'Optionnel'
  },
  'applications_list_title': {
    en: 'Applications List',
    fr: 'Liste des candidatures'
  }
};

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLang = new BehaviorSubject<'en' | 'fr'>('en');
  currentLang$ = this.currentLang.asObservable();

  setLanguage(lang: 'en' | 'fr') {
    this.currentLang.next(lang);
  }

  translate(key: string): string {
    return TRANSLATIONS[key]?.[this.currentLang.value] || key;
  }
} 