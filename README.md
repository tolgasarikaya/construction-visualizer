# İnşaat Projesi Görselleştirme Uygulaması

<div align="center">
  <img src="https://via.placeholder.com/120x120?text=🏢" alt="Construction Visualizer Logo" width="120" />
  <h2>İnşaat Projesi Görselleştirici</h2>
  <p>Bina ve daire yerleşimlerini kolayca yönetip görselleştirin</p>
  
  <p>
    <a href="#özellikler">Özellikler</a> •
    <a href="#kurulum">Kurulum</a> •
    <a href="#kullanım">Kullanım</a> •
    <a href="#docker">Docker</a> •
    <a href="#geliştirme">Geliştirme</a>
  </p>
</div>

## 📋 Proje Özeti

Bu uygulama, bina projelerindeki kat planlarını ve daire dağılımlarını interaktif olarak görselleştiren bir web aracıdır. Kullanıcılar, bir binanın kat sayısını, her kattaki daire sayısını ve dubleks/normal daire dağılımını düzenleyebilir ve sonuçları anında görsel olarak görebilirler.

## ✨ Özellikler

- **Dinamik Kat Yönetimi**: 1'den 20'ye kadar kat sayısını ayarlayabilme
- **Özelleştirilebilir Daire Yapılandırması**: Her katta 1-8 arası daire sayısı tanımlayabilme
- **Dubleks Daire Desteği**: Herhangi bir katı dubleks daire olarak işaretleyebilme
- **Gerçek Zamanlı Görselleştirme**: Tüm değişikliklerin anında görüntülenmesi
- **Önizleme Modu**: Sadece bina planını görebilmek için düzenleme arayüzünü gizleme
- **Duyarlı Tasarım**: Mobil cihazlar dahil her ekranda çalışan responsive tasarım
- **Yatay Kaydırma**: Geniş yapılandırmalar için yatay kaydırma özelliği

## 🔧 Teknolojiler

- **Frontend**: Next.js 15.3.2, React, TypeScript
- **Stil**: Tailwind CSS
- **Layout**: React Grid Layout
- **Konteynerizasyon**: Docker
- **Deployment**: Docker Compose

## 📦 Kurulum

### Önkoşullar

- Node.js (v18+)
- npm veya yarn
- Docker ve Docker Compose (isteğe bağlı)

### Yerel Kurulum

1. Repo'yu klonlayın:

   ```bash
   git clone https://github.com/tolgasarikaya/construction-visualizer.git
   cd construction-visualizer
   ```

2. Bağımlılıkları yükleyin:

   ```bash
   npm install
   # veya
   yarn install
   ```

3. Geliştirme sunucusunu başlatın:

   ```bash
   npm run dev
   # veya
   yarn dev
   ```

4. Tarayıcınızda şu adresi ziyaret edin: [http://localhost:3000](http://localhost:3000)

### Docker ile Kurulum

1. Repo'yu klonlayın:

   ```bash
   git clone https://github.com/tolgasarikaya/construction-visualizer.git
   cd construction-visualizer
   ```

2. Docker container'ını oluşturun ve başlatın:

   ```bash
   docker-compose up -d --build
   ```

3. Tarayıcınızda şu adresi ziyaret edin: [http://localhost:3000](http://localhost:3000)

## 📱 Kullanım

### Temel Kullanım Kılavuzu

1. **Genel Ayarlar Bölümü**:

   - **Kat Sayısı**: Binanın toplam kat sayısını ayarlayın (1-20 arası)
   - **Varsayılan Daire**: Yeni eklenen katlarda oluşturulacak varsayılan daire sayısını belirleyin

2. **Kat Ayarları Bölümü**:

   - Her kat için ayrı ayrı daire sayısını ayarlayın
   - İstediğiniz katları dubleks olarak işaretleyin
   - Tabloda tüm kat yapılandırmalarını görün ve düzenleyin

3. **Görselleştirme**:

   - Binanın görsel temsili tüm yapılandırma değişikliklerini anında yansıtır
   - Dubleks daireler ve normal daireler farklı renklerle gösterilir
   - Daire numaraları otomatik olarak atanır

4. **Önizleme Modu**:
   - Başlık çubuğundaki "Önizleme" butonuna tıklayarak sadece bina planını görüntüleyin
   - "Düzenle" butonuyla düzenleme arayüzüne geri dönün

### İpuçları ve Püf Noktaları

- Dubleks daireler iki kat yüksekliğindedir ve bir sonraki katın yerleşimini etkiler
- Çok sayıda daire içeren yapılandırmalarda yatay kaydırma özelliğiyle tüm daireleri görüntüleyebilirsiniz
- Önce genel kat sayısını ve varsayılan daire sayısını belirleyin, sonra her kata özel ayarlamalar yapın

## 🐳 Docker

### Docker Komutları

```bash
# Container'ı başlatma
docker-compose up -d

# Container'ı durdurma
docker-compose down

# Container loglarını görüntüleme
docker logs construction-visualizer

# Container'ı yeniden oluşturma (kod değişikliklerinden sonra)
docker-compose up -d --build
```

### Docker Yapılandırması

Uygulama, optimal konteynerizasyon için aşağıdaki yapılandırmalarla gelir:

- **Dockerfile**: Çok aşamalı (multi-stage) build yaklaşımıyla optimize edilmiş container
- **docker-compose.yaml**: Uygulama servisini tanımlayan Docker Compose yapılandırması
- **next.config.js**: Docker uyumlu çalışma için `output: "standalone"` ayarı tanımlanmış

## 💻 Geliştirme

### Proje Yapısı

```
construction-visualizer/
├── components/           # React bileşenleri
├── pages/                # Next.js sayfaları
│   └── index.tsx         # Ana sayfa
├── public/               # Statik dosyalar
├── styles/               # CSS stilleri
├── Dockerfile            # Docker yapılandırması
├── docker-compose.yaml   # Docker Compose yapılandırması
├── next.config.js        # Next.js yapılandırması
├── package.json          # Bağımlılıklar ve betikler
└── README.md             # Dokümantasyon
```

### Katkıda Bulunma

1. Bu repo'yu fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inize push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje [MIT](LICENSE) lisansı altında lisanslanmıştır.

## 👨‍💻 Geliştirici

[Tolga](tolga.sarikaya.dev@gmail.com)

---

<div align="center">
  <sub>Built by <a href="https://github.com/tolgasarikaya">Tolga SARIKAYA</a></sub>
</div>
