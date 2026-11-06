# FYP360 Design System

## Overview
FYP360 is a calm, formal academic project-management portal used by universities. The UI is spacious, card-based and low-contrast, with a deep navy sidebar and a single teal accent. AI features are always labelled "advisory". Tone: professional, reassuring, never playful. No emojis.

## Colors
- Sidebar navy: #0B1F3A (gradient to #0E2747)
- Primary button / headings navy: #12294A
- Teal accent (eyebrows, links, progress, success): #129C86
- Teal tint background: #E7F5F2
- Page canvas: #F4F6FA
- Card surface: #FFFFFF, border #E8ECF2
- Muted text: #6B7A90
- Warning: text #B26B00 on #FDF1E1
- Danger: text #C2392F on #FDE8E6
- Info tint: #EAF0F7
- Badge coral: #E8705A

## Typography
Font: Inter. Page titles 36-40px light weight in navy. Eyebrows 12px uppercase bold with wide letter spacing in teal. Body 14-15px regular. Labels 12-13px medium. Big numbers semibold.

## Shape and elevation
Cards radius 20px, 1px border, very soft shadow. Buttons radius 14px, height 48-56px. Inputs radius 12px, height 52px. Modals radius 24px with blurred dark backdrop. Pills fully rounded.

## Layout
Fixed left sidebar 260px (navy). White top bar 72px with breadcrumb left, bell, divider and user chip right. Content column about 940px, 40px padding, 24px gap between cards.

## Components
- Sidebar item: 48px tall, outline icon, active state has dark teal tint, 3px teal left edge, white text.
- Primary button: navy with white text and arrow icon. Secondary: white with border. Disabled: flat grey.
- Status pill: teal on mint for good or complete, amber for pending or in progress, red for overdue or risk, grey for locked or not started.
- Stat tile: tinted icon square, muted label, large value.
- Stepper: teal check for complete, amber number in progress, red number overdue, grey upcoming.
- Info banner: mint fill, teal border, shield or sparkle icon. Warning banner amber. Decision banner navy.
- Table: rounded container, uppercase grey headers, 72px rows.
- Lettered section cards: navy rounded square with white letter.

## Do and Don't
- Do keep the same sidebar and top bar on every screen.
- Do keep one primary action per area.
- Do label AI output as advisory.
- Don't use gradients except the logo tile and sidebar.
- Don't use more than one accent color.
- Don't mention a specific university; use the placeholder "Your University".
