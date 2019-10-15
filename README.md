**FreeCodeCamp**- Information Security and Quality Assurance
------
LIVE: https://fcc-personal-library-app.glitch.me/

**User stories:**

Nothing from my website will be cached in my client as a security measure.

I will see that the site is powered by 'PHP 4.2.0' even though it isn't as a security measure.

I can post a title to /api/books to add a book and returned will be the object with the title and a unique _id.

I can get /api/books to retrieve an array of all books containing title, _id, & commentcount.

I can get /api/books/{_id} to retrieve a single object of a book containing title, _id, & an array of comments (empty array if no comments present).

I can post a comment to /api/books/{_id} to add a comment to a book and returned will be the books object similar to get /api/books/{_id}.

I can delete /api/books/{_id} to delete a book from the collection. Returned will be 'delete successful' if successful.

If I try to request a book that doesn't exist I will get a 'no book exists' message.

I can send a delete request to /api/books to delete all books in the database. Returned will be 'complete delete successful' if successful.

All 6 functional tests required are complete and passing.
