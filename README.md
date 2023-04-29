## To Run:

```bash
$ npm i
$ npm start
# npm start will run both npm build and npm start
```

## To Use:
After running `npm start`, the app will create a production build and then run it on `http://localhost:3000/`. You can open that up in the browser of your choice to see the a list of various Mars Rovers. Clicking on the title of any of the Rovers will take you to a page where you can pick a date from the dropdown at the top to display pictures from that day.

If you choose a date where no pictures were taken, a message will inform you as such and ask you to pick a different day. If you choose a day after the mission ended, there is also a message for that pointing you to the correct timeframe to look for photos.

To reduce load times, images are loaded in different pages, 25 images at a time. You can scroll down to the bottom of the page to see 'Next Page' and 'Previous Page' buttons for navigating to or from additional pages of photos.

---
This project uses Next.js, eslint, scss, Material UI (and MUI X).
