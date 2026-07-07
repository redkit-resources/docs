document$.subscribe(({ body }) => {
  GraphViewer.processElements()

  reload();
})
