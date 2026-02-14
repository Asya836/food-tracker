# 🍎 Food Tracker - Gıda Takip Uygulaması

React Native ve Expo ile geliştirilmiş, gıda ürünlerinin son kullanma tarihlerini takip eden mobil uygulama.

## 📱 Özellikler

- ✅ Ürün ekleme, düzenleme ve silme
- 📅 Son kullanma tarihi takibi
- 🎨 Tarihe göre renk kodlu uyarı sistemi
  - 🟢 Yeşil: 7+ gün kaldı
  - 🟠 Turuncu: 1-7 gün arası
  - 🔴 Kırmızı: Tarihi geçmiş
- 🔍 Filtreleme seçenekleri (Tümü / Yaklaşan / Geçmiş)
- 💾 AsyncStorage ile kalıcı veri saklama
- 🎯 Montserrat font ailesi ile modern tasarım

## 🚀 Kurulum

### Gereksinimler

- Node.js (v14 veya üzeri)
- npm veya yarn
- Expo CLI
- Expo Go uygulaması (mobil cihaz için)

### Adımlar

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Uygulamayı başlatın:
```bash
npx expo start
```

3. Expo Go uygulamasıyla QR kodu tarayın veya emülatörde çalıştırın.

## 📦 Kullanılan Teknolojiler

- **React Native** - Mobil uygulama geliştirme
- **Expo** - React Native development platform
- **React Navigation** - Sayfa yönlendirme
- **AsyncStorage** - Yerel veri saklama
- **Context API** - State yönetimi
- **Expo Google Fonts** - Montserrat font ailesi
- **Expo Vector Icons** - İkon kütüphanesi

## 📂 Proje Yapısı

```
food-tracker/
├── src/
│   ├── components/
│   │   └── Food.js           # Ürün kartı komponenti
│   ├── context/
│   │   └── FoodContext.js    # Global state yönetimi
│   └── pages/
│       ├── HomePage.js       # Ana sayfa
│       ├── AddFoodPage.js    # Ürün ekleme sayfası
│       └── FoodDetailPage.js # Ürün detay/düzenleme sayfası
├── App.js                    # Ana uygulama dosyası
└── package.json
```

## 🎯 Kullanım

### Ürün Ekleme
1. Ana sayfada sağ alt köşedeki "+" butonuna tıklayın
2. Ürün adını girin
3. Son kullanma tarihini seçin
4. "Kaydet" butonuna basın

### Ürün Görüntüleme
- Ana sayfada tüm ürünlerinizi görebilirsiniz
- Filtreleme butonları ile ürünleri kategorize edin
- Her ürün kartında kalan gün sayısı ve durum gösterilir

### Ürün Düzenleme/Silme
1. Ürün kartının sağındaki ">" işaretine tıklayın
2. Detay sayfasında ürün bilgilerini güncelleyin
3. "Güncelle" veya "Sil" butonlarını kullanın

## Ekran Görüntüleri
<img width="471" height="1002" alt="anasayfa" src="https://github.com/user-attachments/assets/913a06fd-d03c-4ee2-acbd-bc9a5e7a0255" />
<img width="475" height="1000" alt="ürün ekleme" src="https://github.com/user-attachments/assets/1fbf8f59-375c-4eae-9e40-9fdb377878de" />
<img width="477" height="1006" alt="detay sayfası" src="https://github.com/user-attachments/assets/cbc5115c-defa-4884-9e34-3626882421ca" />

