---
courseId: interactive-course-system
moduleId: interaction
moduleTitle: Interaction
title: Adding Learner Interactivity
description: Add persisted checks without introducing server dependencies.
order: 3
estimatedMinutes: 35
objectives:
  - Use islands only where needed.
  - Persist learner state with localStorage.
updatedDate: 2026-01-10
---

# Adding Learner Interactivity

Static deployments can still deliver meaningful interaction.

## Persistence model

Use a deterministic key that combines course, lesson, and component identifiers.

> Implementation detail: a key pattern like `courseId:lessonSlug:componentId` keeps storage entries conflict-free.

## Reflection prompt

Describe one lesson interaction you would add for your learners and why.
