// i18n.js
import i18next from "i18next";
import I18NextVue from "i18next-vue";
import LanguageDetector from "i18next-browser-languagedetector";

i18next.use(LanguageDetector).init({
  debug: true,
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        welcome: "Welcome",
        pageTitle: "All Posts",
        createPostButton: "Create Post",
        deleteButton: "Delete",
        viewDetailsButton: "View Details",
        deleteConfirmation: "Are you sure you want to delete this post?",
        commentsTitle: "Comments",
        backButton: "Back to All Posts",
        postLabel: "Post",
        createNewPostTitle: "Create a New Post",
        yourNameLabel: "Your Name",
        titleLabel: "Title",
        contentLabel: "Content",
        savePostButton: "Save Post",
        fillInAllFieldsAlert: "Please fill in all fields.",
        chatbotInfo:
          "Scroll down to the bottom of the page to see the new chatbot feature :)",
        ENGlanguage: "English",
        ARlanguage: "Arabic",
        addCommentButton: "Add Comment",
      },
    },
    ar: {
      translation: {
        welcome: "اهلا بك",
        pageTitle: "جميع المنشورات",
        createPostButton: "إنشاء منشور",
        deleteButton: "حذف",
        viewDetailsButton: "عرض التفاصيل",
        deleteConfirmation: "هل أنت متأكد أنك تريد حذف هذا المنشور؟",
        commentsTitle: "التعليقات",
        backButton: "العودة إلى جميع المنشورات",
        postLabel: "المنشور",
        createNewPostTitle: "إنشاء منشور جديد",
        yourNameLabel: "اسمك",
        titleLabel: "العنوان",
        contentLabel: "المحتوى",
        savePostButton: "حفظ المنشور",
        fillInAllFieldsAlert: "يرجى ملء جميع الحقول.",
        chatbotInfo: "انزل الي اسفل الشاشة لاستعمال خاصية الchatbot الجديدة :)",
        ENGlanguage: "الانحليزية",
        ARlanguage: "العربية",
        addCommentButton: "اضف تعليق",
      },
    },
  },
});

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(I18NextVue, { i18next });
});
