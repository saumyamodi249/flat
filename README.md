# Riviera Select Real-Estate Web Application (Flat)

A luxury, interactive real-estate web application featuring interactive building perspectives, real-time live inventory filtering, multi-layered maps, live weather widgets, responsive mobile drawer navigation, and robust state management.

---

## 🏛️ Project Architecture: Kab, Kaha, Kya aur Kyu?

Har folder aur file ko **"Feature-Driven Modular Architecture"** aur **"Separation of Concerns"** ke mutabiq organize kiya gaya hai. Yahan pure project ke har hisse ka complete logic diya gaya hai:

---

### 1. Root & Core Application Files (`src/`)

| File / Folder | Kaha (Location) | Kya (Responsibility) | Kyu (Architectural Logic) | Kab (When It Runs) |
| :--- | :--- | :--- | :--- | :--- |
| **`main.jsx`** | `src/main.jsx` | React root mount (`createRoot`). | React runtime ko DOM ke `<div id="root">` ke saath bind karta hai. | App load hone par sabse pehle execute hota hai. |
| **`App.jsx`** | `src/App.jsx` | Master Route Coordinator. | Persistent Layout (`Home` backdrop) ke upar nested routes (`/amenities`, `/gallery`, `/maps`, etc.) render karta hai, jabki `/inventory` independent route rehta hai. | Route change hone par component navigation handle karta hai. |
| **`index.css`** | `src/index.css` | Global Luxury Theme Tokens & Utilities. | Emerald `#071B11`, Champagne Bronze `#C09973`, Soft Cream `#F7E4CF` variables, glassmorphism, aur `scrollbar-none` utilities centralized rakhta hai. | Pure application ke styling load hone ke waqt. |

---

### 2. Global Shared Components (`src/components/`)
> **Logic:** Wo UI elements jo kisi ek page tak seemit nahi hain, balki pure project mein har jagah share hote hain.

- **`BottomNav.jsx`**: Persistent bottom bar jisme mobile clubbed navigation (4 dots drawer), desktop 7-page routes, aur SolidTwin branding logo hai.
- **`TopNav.jsx`**: Shared top header jisme brand identity aur global links hain.
- **`PageBackground.jsx`**: Global backdrop layout jo consistent visual atmosphere banata hai.

---

### 3. Global Custom Hooks (`src/hooks/`)
> **Logic:** Reusable browser APIs aur mathematical algorithms jinme koi UI/HTML nahi hoti.

- **`useGeoLocation.js`**: User ki GPS/Browser location fetch karta hai taaki local weather aur map coordinates calculate ho sakein.
- **`usePanZoom.js`**: Interactive master plans aur maps par smooth drag, pinch-to-zoom aur bounded pan controls provide karta hai.

---

### 4. API & External Services (`src/api/`)
> **Logic:** Third-party APIs aur external data sources ko UI components se alag rakhna taaki network failure UI ko na tode.

- **`maps/`**: Map data providers aur coordinate endpoints.
- **`UrbanDataLayers/`**: Infrastructure, transport, aur civic zoning data.
- **`temptimeweather/`**: Live local temperature, humidity, aur time synchronization.

---

### 5. Inventory Architecture (`src/inventory/`)
> **Logic:** Sabse critical feature jisme 180 flats (18 floors × 10 units), live dual-thumb range sliders, 5-flat scroll lock table, aur 3D building perspective hain.

```text
src/inventory/
├── store/
│   ├── useInventoryStore.js        (Zustand Live Store)
│   └── inventoryMobxStore.js       (MobX Observable Store)
├── hooks/
│   └── useInventoryData.js         (Custom Memoized Filter Hook)
├── views/
│   ├── InventoryIntroView.jsx      (View 1: Building + Floating Controls)
│   └── InventoryFilterView.jsx     (View 2: 40% Filter Panel + 60% Building)
├── components/
│   ├── AreaRangeSlider.jsx         (Dual-thumb Draggable Slider)
│   ├── InventoryFilterControls.jsx (Type, Exposure, Status & Area Inputs)
│   ├── InventoryTable.jsx          (5-Flat Isolated Scroll Table)
│   ├── MobileFlatsCarousel.jsx     (Mobile Touch/Drag Flat Cards)
│   └── MobileFilterModal.jsx       (Mobile Backdrop Filter Drawer)
├── pages/
│   ├── InventoryPage.jsx           (38-line Main Controller)
│   └── InventoryPageDetail.jsx     (Selected Unit Card Specification)
├── data.js                         (Lightweight 180-Unit Scalable Generator)
└── Inventory.jsx                   (Module Export Entry)
```

#### Detailed Rationale for Inventory Subfolders:

#### A. `store/` (State & Data Memory)
- **Kyu alag banaya:** Isme **zero UI (HTML/JSX)** hoti hai. Iska akela kaam hai user ke selected filters, active unit ID, modal open/close states aur single-favorite unit ko persist rakhna.
- **`useInventoryStore.js` (Zustand):** Production live store jo prop-drilling ko 100% khatam karta hai.
- **`inventoryMobxStore.js` (MobX):** Class-based alternative using `makeAutoObservable` with computed getters.

#### B. `hooks/` (Business Logic & Mathematics)
- **`useInventoryData.js`**:
  - **Kyu alag banaya:** 180 flats par realtime filtering (type, exposure, status, sq.ft bounds) aur Unit 801 prioritization calculation ek pure computation task hai. Isko component se bahar nikalne se page ka render loop ultra-fast rehta hai (`useMemo`).

#### C. `views/` (High-Level Screen Layouts)
- **Kyu alag banaya:** Inventory ke do completely different visual modes hain:
  - **`InventoryIntroView.jsx` (VIEW 1):** Jab filter band ho — clean 3D isometric perspective, floating filter button, aur mobile horizontal cards carousel.
  - **`InventoryFilterView.jsx` (VIEW 2):** Jab user filter kholta hai — 40% Left Filter Controls + 60% Right Building Area with docked 5-flat table.
  - Dono views ko alag rakhne se `InventoryPage.jsx` monolithic hone se bach gaya aur sirf **38 lines** ka clean router reh gaya.

#### D. `components/` (Reusable Interactive Widgets)
- **`AreaRangeSlider.jsx`**: Dual slider ka pointer event math (`pointerdown`, `pointermove`), step snapping (`100 sq.ft`), aur thumb boundaries handle karta hai.
- **`InventoryFilterControls.jsx`**: Property Type, Exposure pills, Status tabs, aur Min/Max area inputs ko visually render karta hai.
- **`InventoryTable.jsx`**: Exactly 5 flats visible at 200px height. Table row scrolling isolated hai (`overscrollBehavior: 'contain'` + wheel event lock), jisse flat table scroll karne par pura page jump nahi karta.
- **`MobileFlatsCarousel.jsx`**: Mobile swipe/drag gesture se flat cards scroll karta hai.
- **`MobileFilterModal.jsx`**: Tablet/Mobile par bottom drawer filter sheet render karta hai.

#### E. `data.js` (Static Labels & Lightweight Unit Engine)
- **Kyu optimize kiya:** 31 KB ki hardcoded 300-line boring repetition ko khatam karke **3.4 KB** ke dynamic generator mein badla gaya jo 18 floors × 10 flats (101 se 1810), ordinal floor suffixes (`1st`, `2nd` ... `18th`), penthouse tiers, aur comma-separated multi-direction exposures (`N,E`, `N,W`) automatically generate karta hai.

---

### 6. Feature Modules (`src/home/`, `src/amenities/`, `src/gallery/`, `src/maps/`, `src/about/`, `src/contact/`)
> **Logic:** Har page/feature ka apna self-contained ecosystem hai:
- `data.js`: Us feature ke specific media assets aur text labels.
- `components/`: Us feature ke cards, sliders, carousel items.
- `pages/`: Route ke corresponding view components.
- `Feature.jsx`: Route root container.

---

## 🚀 Key Technical Highlights

1. **Zero Prop-Drilling:** Zustand global store aur custom hook ke zariye subcomponents bina 10-12 props pass kiye directly state consume aur mutate karte hain.
2. **Strict Scroll Containment:** Flat table par 5 rows (200px) ki strict visibility aur boundary wheel trapping se layout stability 100% maintain rehti hai.
3. **Responsive Architecture:** Mobile devices ke liye touch drawers aur carousel; Desktop ke liye 40%/60% dual-panel workstation layout.
4. **Clean Code Standards:** Main page files 930+ lines se ghatkar clean 38 lines mein refactor ho chuki hain.
