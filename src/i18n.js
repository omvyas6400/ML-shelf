import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      "home": "Home",
      "ml_model_management": "ML Model Management",
      "create_model": "Create Model",
      "model_name": "Model Name",
      "model_layers": "Model Layers",
      "text_classifier": "Text Classifier",
      "visual_classifier": "Visual Classifier",
      "optical_recognizer": "Optical Recognizer",
      "training_data": "Training Data",
      "upload_data": "Upload Data",
      "start_training": "Start Training",
      "view_details": "View Details",
      "model_list": "Model List",
      "model_details": "Model Details",
      "create_new_model": "Create a New Model",
      "light_mode": "Light Mode",
      "dark_mode": "Dark Mode",
      "upload_file": "Upload File",
      "not_trained": "Not Trained",
      "trained": "Trained",
      "being_trained": "Being Trained",
      "logout": "Logout",
      "welcome": "Welcome",
      "select_file": "Select File",
      "attach_document": "Attach Document",
      "enter_model_name": "Enter Model Name",
      "select_model_layers": "Select Model Layers",
      "error_fetching_models": "Error fetching models",
      "uploaded_on": "Uploaded on",
      "status": "Status",
      "train": "Train",
      "training": "Training...",
      "no_models_available":"No Models Available",
      "model_created_successfully":"Model Created Successfully",
      "file_uploaded_successfully":"File Uploaded Successfully",
      "training_started_successfully":"Training Started Successfully",
      "delete_model":"Delete Model",
      "delete":"Delete"
    }
  },
  tr: {
    translation: {
      "home": "Ana Sayfa",
      "ml_model_management": "ML Model Yönetimi",
      "create_model": "Model Oluştur",
      "model_name": "Model Adı",
      "model_layers": "Model Katmanları",
      "text_classifier": "Metin Sınıflandırıcı",
      "visual_classifier": "Görsel Sınıflandırıcı",
      "optical_recognizer": "Optik Tanıyıcı",
      "training_data": "Eğitim Verileri",
      "upload_data": "Veri Yükle",
      "start_training": "Eğitimi Başlat",
      "view_details": "Detayları Görüntüle",
      "model_list": "Model Listesi",
      "model_details": "Model Detayları",
      "create_new_model": "Yeni Model Oluştur",
      "light_mode": "Aydınlık Mod",
      "dark_mode": "Karanlık Mod",
      "upload_file": "Dosya Yükle",
      "not_trained": "Eğitilmedi",
      "trained": "Eğitildi",
      "being_trained": "Eğitiliyor",
      "logout": "Çıkış Yap",
      "welcome": "Hoşgeldiniz",
      "select_file": "Dosya Seç",
      "error_fetching_models": "Modeller alınırken hata oluştu",
      "attach_document": "Belge Ekle",
      "enter_model_name": "Model Adı Girin",
      "select_model_layers": "Model Katmanlarını Seçin",
      "uploaded_on": "Yüklenme Tarihi",
      "status": "Durum",
      "train": "Eğit",
      "training": "Eğitiliyor...",
      "no_models_available":"Model Mevcut Değil",
      "model_created_successfully":"Model Başarıyla Oluşturuldu",
      "file_uploaded_successfully":"Dosya Başarıyla Yüklendi",
      "training_started_successfully":"Eğitim Başarıyla Başlatıldı",
      "delete_model":"Modeli sil",
      "delete":"Sil"
    }
  }
};

// Get the language from local storage or use 'en' as the default
const savedLanguage = localStorage.getItem('i18nextLng') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'en', // Fallback language if the desired language is unavailable
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export default i18n;
