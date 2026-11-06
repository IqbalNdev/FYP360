---
name: Academic Project Management Portal
colors:
  surface: '#faf9fc'
  surface-dim: '#dbd9dd'
  surface-bright: '#faf9fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f6'
  surface-container: '#efedf0'
  surface-container-high: '#e9e7eb'
  surface-container-highest: '#e3e2e5'
  on-surface: '#1b1b1e'
  on-surface-variant: '#44474e'
  inverse-surface: '#303033'
  inverse-on-surface: '#f2f0f3'
  outline: '#74777f'
  outline-variant: '#c4c6cf'
  surface-tint: '#4a5f83'
  primary: '#001431'
  on-primary: '#ffffff'
  primary-container: '#12294a'
  on-primary-container: '#7c91b7'
  inverse-primary: '#b2c7f0'
  secondary: '#006b5b'
  on-secondary: '#ffffff'
  secondary-container: '#81f4da'
  on-secondary-container: '#00705f'
  tertiary: '#221000'
  on-tertiary: '#ffffff'
  tertiary-container: '#3f2200'
  on-tertiary-container: '#b4875a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#b2c7f0'
  on-primary-fixed: '#021b3c'
  on-primary-fixed-variant: '#32476a'
  secondary-fixed: '#84f6dd'
  secondary-fixed-dim: '#66dac1'
  on-secondary-fixed: '#00201a'
  on-secondary-fixed-variant: '#005144'
  tertiary-fixed: '#ffdcbd'
  tertiary-fixed-dim: '#f0bd8b'
  on-tertiary-fixed: '#2c1600'
  on-tertiary-fixed-variant: '#623f19'
  background: '#faf9fc'
  on-background: '#1b1b1e'
  surface-variant: '#e3e2e5'
  sidebar-navy: '#0B1F3A'
  sidebar-navy-gradient: '#0E2747'
  teal-accent: '#129C86'
  teal-tint: '#E7F5F2'
  page-canvas: '#F4F6FA'
  card-surface: '#FFFFFF'
  card-border: '#E8ECF2'
  muted-text: '#6B7A90'
  warning-text: '#B26B00'
  warning-bg: '#FDF1E1'
  danger-text: '#C2392F'
  danger-bg: '#FDE8E6'
  info-tint: '#EAF0F7'
  badge-coral: '#E8705A'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '300'
    lineHeight: 48px
  headline-lg:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '300'
    lineHeight: 44px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  eyebrow:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.08em
  big-number:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 38px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 24px
  margin: 40px
  space-xs: 4px
  space-sm: 8px
  space-md: 16px
  space-lg: 24px
  space-xl: 40px
---

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