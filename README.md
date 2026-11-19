# Level Placement Test Booking (Frontend)

Next.js (App Router) + React 19 + TypeScript + Tailwind CSS v4. Frontend only: no backend, no database, no Vite.
All booking data lives in React state (a context provider in the root layout).

## Requirements

- Node.js 20.9 or newer (Node 22 LTS recommended)
- npm 10+ (comes with Node)

## Installation and setup

```bash
# 1. Unzip and enter the project
unzip level-placement-booking.zip
cd level-placement-booking

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open http://localhost:3000

### Production build (optional)

```bash
npm run build
npm start        # serves on http://localhost:3000
```

### Other scripts

```bash
npm run typecheck   # TypeScript check without emitting files
```

## Pages

| Route            | Purpose                                                           |
| ---------------- | ----------------------------------------------------------------- |
| `/`              | Booking List: cards with status, date, time, edit and view icons  |
| `/create`        | Level Placement Test Booking form + Burmese instructions          |
| `/update/[id]`   | Update Booking form (DOB, date and time are locked, as in mockup) |
| `/bookings/[id]` | Read-only details, payment slip preview, "Join to Zoom Class"     |

## Behaviour

- New bookings are added to the top of the list with status **Pending**.
- **Pending / Accepted / Rejected** bookings can be edited; **Enrolled** cannot (no edit icon).
- Editing a **Rejected** booking sends it back to **Pending**.
- Payment slips are kept in memory only (image preview on the details page).
- Form validation: required fields, Myanmar phone format (`09xxxxxxxxx`, `+959...`),
  DOB in the past, booking date not in the past, slip required (max 5 MB, image or PDF).
- **State is in memory by design**: refreshing the browser resets to the demo data.
  Navigate with the in-app links/buttons to keep your changes.
- Date and time fields use the browser's native pickers, so their display format
  (e.g. dd/mm/yyyy vs mm/dd/yyyy) follows the browser's locale.

## Project structure

```
public/images/            icons and avatar from Resources/
src/app/                  routes (layout.tsx, page.tsx, create, update/[id], bookings/[id])
src/components/           BookingCard, BookingForm, FormControls, StatusBadge, ...
src/context/              BookingContext (React state) + seed data
src/lib/                  constants, formatting, validation, Burmese instruction text
src/types/                Booking types
```

## Design tokens

Colors come from `Resources/color.txt` and are defined once in `src/app/globals.css`
(`primary`, `secondary`, `status-pending/accepted/rejected/enrolled`).

Note: `color.txt` gives the pending status as `#323653`, but the listing mockup shows
PENDING in orange, so the mockup is followed. To use the `color.txt` value, change
`--color-status-pending` in `globals.css`.

Fonts (Chakra Petch for Latin text, Noto Sans Myanmar for Burmese) are bundled through
`@fontsource` packages, so no internet connection is needed at runtime.
