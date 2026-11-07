---
"minerva-design": patch
---

Restore modal focus after iframe focus transfers with a null relatedTarget. Deferred recovery respects paused or deactivated scopes and leaves focus alone when the document no longer owns it.
