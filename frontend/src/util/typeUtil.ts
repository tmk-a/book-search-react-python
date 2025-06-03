// typeUtil.ts

export type SearchInputT = {
  title: string;
  author: string;
  publisher: string;
  subject: string;
  keyword: string;
};

export type BookHeader = {
  id: string;
  title: string;
  description: string;
  published_date: string;
  thumbnail: string;
  preview_link: string;
};

export type BookDetail = {
  title: string;
  subtitle: string;
  authors: string[];
  publisher: string;
  publishedDate: string; // e.g. "2022-03-01"
  description: string; // HTML-formatted string
  industryIdentifiers: {
    type: string; // e.g. "ISBN_10" | "ISBN_13"
    identifier: string;
  }[];
  readingModes: {
    text: boolean;
    image: boolean;
  };
  pageCount: number;
  printedPageCount: number;
  printType: string; // e.g. "BOOK"
  categories: string[];
  maturityRating: string; // e.g. "NOT_MATURE"
  allowAnonLogging: boolean;
  contentVersion: string;
  panelizationSummary: {
    containsEpubBubbles: boolean;
    containsImageBubbles: boolean;
  };
  imageLinks: {
    smallThumbnail?: string;
    thumbnail?: string;
    small?: string;
    medium?: string;
    large?: string;
    extraLarge?: string;
  };
  language: string; // e.g. "en"
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
};

export type BookVolume = {
  kind: string; // e.g. "books#volume"
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: BookDetail;
  layerInfo?: {
    layers: {
      layerId: string;
      volumeAnnotationsVersion: string;
    }[];
  };
  saleInfo?: {
    country: string;
    saleability: string;
    isEbook: boolean;
    listPrice?: {
      amount: number;
      currencyCode: string;
    };
    retailPrice?: {
      amount: number;
      currencyCode: string;
    };
    buyLink?: string;
    offers?: {
      finskyOfferType: number;
      listPrice: {
        amountInMicros: number;
        currencyCode: string;
      };
      retailPrice: {
        amountInMicros: number;
        currencyCode: string;
      };
      giftable: boolean;
    }[];
  };
  accessInfo?: {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission: string;
    epub: {
      isAvailable: boolean;
      acsTokenLink?: string;
    };
    pdf: {
      isAvailable: boolean;
      acsTokenLink?: string;
    };
    webReaderLink?: string;
    accessViewStatus?: string;
    quoteSharingAllowed: boolean;
  };
};
