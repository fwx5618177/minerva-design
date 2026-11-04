# Tree chart

Hierarchies drawn as tidy trees, radial trees, mind maps and org charts: organizations, file systems, taxonomies, plans. The tidy tree (Buchheim / Reingold–Tilford) never overlaps and centers every parent over its children; subtrees collapse and expand with an animation, from a click, the keyboard or the API.

Package: minerva-design@1.21.0

Renderer: taro

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "cf7fb249651cd06c89d0951ac2c3a3aa74dc835a",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:563c9bec5d90807342a94c02317519b3da937907129bda2d25ea49762fa828fd"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

#### Overview

TreeChart takes nodes and parent → child edges; nodes without a parent are roots (tree.root picks one). Edges that would create a cycle or a second parent are ignored.

The tidy tree runs in linear time and takes the size of every node into account: labels never overlap, parents are centered over their children and identical subtrees look the same.

layout="tree" (left to right by default, any direction), "radial" (rings around the root, labels along the radius), "mindmap" (branches balanced on both sides, colored per branch) and "org" (cards with a title and a subtitle, orthogonal connectors, leaf teams stacked in columns).

Click a node with children, press Enter on it, or call expand / collapse / toggle: its subtree folds into it with an animation and a badge counts the hidden nodes. collapsed on a node starts it folded.

Olivia Bennett

Daniel Park

Sophie Laurent

Marcus Reed

Ava Thompson

Liam Carter

Noah Kim

Mia Rossi

Lucas Silva

Ethan Brooks

Chloe Martin

Ryan Patel

Grace Hall

Owen Price

Zoe Turner

Jack Evans

Lily Moore

Henry Ward

Chief Executive Officer

Chief Technology Officer

Chief Financial Officer

Chief Operating Officer

Chief Marketing Officer

Frontend Lead

Backend Lead

Frontend Engineer

Frontend Engineer

Backend Engineer

Backend Engineer

Site Reliability Engineer

Financial Controller

Financial Analyst

Support Manager

Logistics Manager

Brand Manager

Growth Manager

Executive

Engineering

Finance

Operations

Marketing

Organization chart of the company

Click a manager to fold or unfold the team.

{{name}}'s team collapsed

{{name}}'s team expanded

Product launch

Goals

10k paying users

Brand awareness

90% retention

Audience

Product teams

Freelancers

Students

Channels

Launch event

Newsletter

Partners

Social media

Timeline

Private beta

Press kit

Launch day

Risks

Delays

Pricing feedback

Budget

Ads

Events

Mind map of a product launch plan

Inputs

Navigation

Feedback

Data display

Layout

Charts

Components of the design system by category

Folders

```tsx
Code
```

Styles

Data

Docs

Expand all

Collapse all

Fit to view

Files of a project

Credit score

Income ≥ 3 × payment?

Employed 2+ years?

Debt-to-income < 35%?

Approved

Approved, lower amount

Approved, higher rate

Manual review

Declined

700 or more

600–699

Below 600

Yes

No

Question

Approved

Review

Declined

Loan approval decision tree, with the path of the current applicant highlighted

Outcome: {{outcome}} (questions asked: {{questions}}).

All products

Electronics

Home

Fashion

Sports

Computers

Phones

Audio

Laptops

Desktops

Tablets

Smartphones

Phone cases

Chargers

Headphones

Speakers

Kitchen

Furniture

Garden

Cookware

Coffee machines

Knives

Sofas

Desks

Office chairs

Garden tools

Plants

Clothing

Shoes

Accessories

Jackets

Dresses

Sneakers

Boots

Bags

Watches

Outdoor

Fitness

Cycling

Tents

Hiking boots

Yoga mats

Dumbbells

Bikes

Helmets

 › 

Search categories

Product category taxonomy of a store

Matching categories: {{total}}. Press Enter or pick a tag to reveal one.

Search for a category, for example “boots” or “desk”.

Macintosh HD

System

Applications

Media

Documents

Caches and backups

Layout

Tree

Radial

Disk usage by folder, sized by the bytes they hold

{{name}}: {{size}} — {{parentShare}} of {{parent}}, {{share}} of the disk.

{{name}}: {{size}} in use.

App 2.0 release

Onboarding

Sign-up

Email verification

Social login

Product tour

Tour screens

Skip and resume

Payments

Checkout

Card form

Wallet payments

Billing

Invoices

Refunds

Platform

Offline mode

Sync queue

Conflict resolution

Quality

Crash reports

Performance budget

{{points}} pts

{{points}} pts · {{done}} done

Summary

Done

In progress

To do

Detail level

Deliverables

Features

Work packages

Showing the plan down to: {{level}}.

Work breakdown structure of a mobile app release, with story points

{{name}} folded: {{points}} points, {{remaining}} remaining.

{{name}} unfolded: {{points}} points, {{remaining}} remaining.

{{points}} story points in total, {{done}} done. Click an item to fold or unfold it.

Quarter-final

Semi-final

Final

To be played

{{winner}}–{{loser}}

Seed {{n}}

Not played

Winner

Still in

Eliminated

Champion

Next round

Restart

New simulation

Knockout tournament bracket from the quarter-finals to the final

{{team}} wins the tournament!

{{round}} winners: {{teams}}.

Eight teams, seeded by rating. Play the next round to reveal the results.

## TreeChart

Support: n/a

DOM / GPU widget of minerva-design/charts (WebGPU or WebGL canvases with DOM overlays): not drawn by the native canvas chart engine; show the web version in a web view.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
