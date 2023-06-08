(() => {
  const mainImage = document.getElementById("mainImage");
  const thumbnails = document.getElementsByClassName("thumbnail");
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");

  let currentImage = mainImage.src;
  setStyleToCurrentThumbnail(thumbnails[0]);

  Array.from(thumbnails).forEach((thumbnail) => {
    thumbnail.addEventListener("click", function ()
    {
      mainImage.src = this.src;
      setStyleToCurrentThumbnail(this);
    });
  });

  function setStyleToCurrentThumbnail(thumbnail)
  {
    Array.from(thumbnails).forEach((thumbnail) => {
      thumbnail.classList.remove("thumbnail-choosed");
    });
    
    thumbnail.classList.add("thumbnail-choosed");
  }

  prevButton.addEventListener("click", function ()
  {
    const currentIndex = Array.from(thumbnails).findIndex(
      (thumbnail) => thumbnail.src === mainImage.src
    );

    if (currentIndex > 0)
    {
      mainImage.src = thumbnails[currentIndex - 1].src;
      setStyleToCurrentThumbnail(thumbnails[currentIndex - 1]);
    }
    else
    {
      mainImage.src = thumbnails[thumbnails.length - 1].src;
      setStyleToCurrentThumbnail(thumbnails[thumbnails.length - 1]);
    }
  });

  nextButton.addEventListener("click", function ()
  {
    const currentIndex = Array.from(thumbnails).findIndex(
      (thumbnail) => thumbnail.src === mainImage.src
    );

    if (currentIndex < thumbnails.length - 1)
    {
      mainImage.src = thumbnails[currentIndex + 1].src;
      setStyleToCurrentThumbnail(thumbnails[currentIndex + 1]);
    }
    else
    {
      mainImage.src = thumbnails[0].src;
      setStyleToCurrentThumbnail(thumbnails[0]);
    }
  });
})();
