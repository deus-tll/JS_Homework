$(() => {
  let responseData = {
    products: null,
    filteredProducts: null,
    tableOptions: ["id", "title", "price", "rating", "brand", "category"],
    sortColumn: null,
    sortDirection: "asc",
  };

  let filters = {
    brand: "none",
    category: "none",
    priceFrom: null,
    priceTo: null,
    ratingFrom: null,
    ratingTo: null,
    searchQuery: "",
  };

  let selectedRow = null;
  const maxPrice = 1000000;
  const maxRating = 5;

  $("#productModal .modal-footer .btn-close-modal").on("click", function () {
    $("#productModal").modal("hide");
  });

  $("#searchInputApplyButton").on("click", (e) => {
    filters.searchQuery = $("#searchInput").val().toLowerCase();
    filterProducts();
    
  });

  $("#priceRangeApplyButton").on("click", (e) => {
    let priceFrom = parseFloat($("#priceFromInput").val());
    let priceTo = parseFloat($("#priceToInput").val());

    if((priceFrom >= 0 && priceFrom < maxPrice) && (priceTo > priceFrom && priceTo <= maxPrice)) {
      filters.priceFrom = priceFrom;
      filters.priceTo = priceTo;
      filterProducts();
    }
  });

  $("#ratingRangeApplyButton").on("click", (e) => {
    let ratingFrom = parseFloat($("#ratingFromInput").val());
    let ratingTo = parseFloat($("#ratingToInput").val());

    if((ratingFrom >= 0 && ratingFrom < maxRating) && (ratingTo > ratingFrom && ratingTo <= maxRating)) {
      filters.ratingFrom = ratingFrom;
      filters.ratingTo = ratingTo;
      filterProducts();
    }
  });

  let filterProducts = () => {
    responseData.filteredProducts = responseData.products.filter((product) => {
      const searchMatch = filters.searchQuery === "" || product.title.toLowerCase().includes(filters.searchQuery);
      const priceMatch =
      (filters.priceFrom === null || product.price >= filters.priceFrom) &&
      (filters.priceTo === null || product.price <= filters.priceTo);
      const ratingMatch =
      (filters.ratingFrom === null || product.rating >= filters.ratingFrom) &&
      (filters.ratingTo === null || product.rating <= filters.ratingTo);
      const brandMatch = filters.brand === "none" || product.brand === filters.brand;
      const categoryMatch = filters.category === "none" || product.category === filters.category;

      return brandMatch && categoryMatch && priceMatch && ratingMatch && searchMatch;
    });

    renderTable(responseData.filteredProducts);
  }

  let refresh = () => {
    filters = {
      brand: "none",
      category: "none",
      priceFrom: null,
      priceTo: null,
      ratingFrom: null,
      ratingTo: null,
      searchQuery: "",
    };

    filterProducts();

    renderTable(responseData.products);

    $("#searchInput").val("");
    $("#priceFromInput").val(null);
    $("#priceToInput").val(null);
    $("#ratingFromInput").val(null);
    $("#ratingToInput").val(null);
    $("#selectBrand").val("none");
    $("#selectCategory").val("none");
  }

  $.get("https://dummyjson.com/products?skip=0&limit=100", {}).done((data) => {
    if (data == null) console.error("Data wasn't received");

    responseData.products = data.products.slice();
    responseData.filteredProducts = data.products.slice();

    const $refreshListButton = $("#refreshListButton");
    $refreshListButton.on("click", (e) => {
      refresh();
    });

    let uniqueValues = new Set();
    $.each(responseData.products, function (index, product) {
      uniqueValues.add(product.brand);
    });
    const $selectBrand = $("#selectBrand");
    setUniqueValuesToSelect(uniqueValues, $selectBrand);
    $selectBrand.on("change", (e) => {
      filters.brand = $(e.target).val();
      filterProducts();
    });

    uniqueValues = new Set();
    $.each(responseData.products, function (index, product) {
      uniqueValues.add(product.category);
    });
    const $selectCategory = $("#selectCategory");
    setUniqueValuesToSelect(uniqueValues, $selectCategory);
    $selectCategory.on("change", (e) => {
      filters.category = $(e.target).val();
      filterProducts();
    });

    let $table = $(".table-products");
    renderHeadTable($table);
    $table.append($("<tbody>"));

    renderTable(responseData.products);
  });

  let renderTable = (products) => {
    let $tbody = $(".table-products > tbody");

    $tbody.empty();

    renderBodyTable(products, $tbody);

    $tbody
      .find("td")
      .on("click", (e) => {
        if (selectedRow != null) selectedRow.removeClass("selected");
        selectedRow = $(e.target).closest("tr").addClass("selected");
      })
      .on("dblclick", (e) => {
        let idProduct = parseInt($(e.target).closest("tr").find("td:nth-child(1)").text());

        let product = findProductById(idProduct);

        if (product == null)
          console.error("No such product was found in the database.");

        showModal(product);
      });

    $(".product-list-data label").text(`Products found: ${products.length}`);
  };

  let renderHeadTable = (parent) => {
    let $thead = $("<thead>").addClass("my-thead-green");
    $thead.append(renderRowHead(responseData.tableOptions));

    $thead.find("th").on("click", (e) => {
      const column = $(e.target).text().toLowerCase();
      if (responseData.sortColumn === column) {
        responseData.sortDirection =
          responseData.sortDirection === "asc" ? "desc" : "asc";
      } else {
        responseData.sortColumn = column;
        responseData.sortDirection = "asc";
      }

      sortData();
      renderTable(responseData.filteredProducts);
    });

    parent.append($thead);
  };

  let sortData = () => {
    const { sortColumn, sortDirection } = responseData;
    if (sortColumn) {
      responseData.filteredProducts.sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) {
          return sortDirection === "asc" ? -1 : 1;
        }
        if (a[sortColumn] > b[sortColumn]) {
          return sortDirection === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    $(".table-products th").removeClass("sort-asc sort-desc");
    $(`.table-products th:contains('${sortColumn}')`).addClass(
      `sort-${sortDirection}`
    );
  };

  let renderBodyTable = (products, parent) => {
    products.forEach((oneProduct) => {
      parent.append(renderRowBody(oneProduct, responseData.tableOptions));
    });
  };

  let setUniqueValuesToSelect = (values, parent) => {
    const initialOption = $("<option>").text("--  None  --").val("none");
    parent.append(initialOption);

    values.forEach(function (value) {
      const option = $("<option>").text(value);
      parent.append(option);
    });
  };

  let renderRowHead = (options = []) => {
    let $row = $("<tr>");
    for (let i = 0; i < options.length; i++) {
      $row.append($("<th>").text(options[i]));
    }

    return $row;
  };

  let renderRowBody = (data = {}, options = []) => {
    let $row = $("<tr>");
    for (const key in data) {
      for (let i = 0; i < options.length; i++) {
        if (options[i] == key) {
          $row.append($("<td>").text(data[key]));
        }
      }
    }

    return $row;
  };

  let showModal = (oneProduct) => {
    $(".modal-body").empty();

    let $productTitle = $("<h5>")
      .addClass("text-center")
      .text(oneProduct.title);
    let $productImagesSlider = $("<div>").addClass("product-images-slider");

    let $descriptionTitle = $("<h6>")
      .addClass("text-center")
      .text("DESCRIPTION");
    let $description = $("<p>").text(oneProduct.description);
    let $descriptionBlock = $("<div>")
      .addClass("description-block")
      .append($description);

    let $productKeyPrice = $("<p>")
      .addClass("product-key-value")
      .text("Price:");
    let $productValuePrice = $("<p>")
      .addClass("product-key-value")
      .text(oneProduct.price);
    let $productPriceBlock = $("<div>")
      .addClass("product-block")
      .append($productKeyPrice)
      .append($productValuePrice);

    let $productKeyRating = $("<p>")
      .addClass("product-key-value")
      .text("Rating:");
    let $productValueRating = $("<p>")
      .addClass("product-key-value")
      .text(oneProduct.rating);
    let $productRatingBlock = $("<div>")
      .addClass("product-block")
      .append($productKeyRating)
      .append($productValueRating);

    let $productKeyBrand = $("<p>")
      .addClass("product-key-value")
      .text("Brand:");
    let $productValueBrand = $("<p>")
      .addClass("product-key-value")
      .text(oneProduct.brand);
    let $productBrandBlock = $("<div>")
      .addClass("product-block")
      .append($productKeyBrand)
      .append($productValueBrand);

    let $productKeyCategory = $("<p>")
      .addClass("product-key-value")
      .text("Category:");
    let $productValueCategory = $("<p>")
      .addClass("product-key-value")
      .text(oneProduct.category);
    let $productCategoryBlock = $("<div>")
      .addClass("product-block")
      .append($productKeyCategory)
      .append($productValueCategory);

    $(".modal-body").append(
      $productTitle,
      $productImagesSlider,
      $descriptionTitle,
      $("<hr>").addClass("hr-style-gray"),
      $descriptionBlock,
      $("<hr>").addClass("hr-style-gray"),
      $productPriceBlock,
      $("<hr>").addClass("hr-style-green"),
      $productRatingBlock,
      $("<hr>").addClass("hr-style-green"),
      $productBrandBlock,
      $("<hr>").addClass("hr-style-green"),
      $productCategoryBlock
    );

    oneProduct.images.forEach((image) => {
      let $image = $("<img>").attr("src", image);
      $productImagesSlider.append($image);
    });

    $("#productModal").on("shown.bs.modal", function () {
      $(".product-images-slider").slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
      });
    });

    $("#productModal").modal("show");
  };

  let findProductById = (id) => {
    for (let i = 0; i < responseData.products.length; i++) {
      if (responseData.products[i].id === id) {
        return responseData.products[i];
      }
    }

    return null;
  };
});
