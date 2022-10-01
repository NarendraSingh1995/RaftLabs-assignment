$(document).ready(function () {
	const authorsData = [];
	const booksData = [];
	const magazineData = [];
	$.ajax('/get-data').then((res) => {
		authorsData.push(...res.authorData);
		booksData.push(...res.booksData);
		magazineData.push(...res.magazineData);
		init();
	});

	const init = () => {
		renderBookTable(booksData, authorsData);
		renderMagazineTable(magazineData, authorsData);
        console.log(magazineData)
	};

	$('#search-book').keyup((e) => {
		console.log(e.target.value);
		console.log(booksData);
		if (e.target.value.length > 0) {
			renderBookTable(
				booksData.filter((book, idx) => {
					if (idx === 0) return true;
					return (
						book[1].includes(e.target.value) || book[2].includes(e.target.value)
					);
				}),
				authorsData
			);
		} else {
			renderBookTable(booksData, authorsData);
		}
	});
	$('#search-magazine').keyup((e) => {
		if (e.target.value.length > 0) {
			renderMagazineTable(
				magazineData.filter((magazine, idx) => {
					if (idx === 0) return true;
					return (
						magazine[1].includes(e.target.value) ||
						magazine[2].includes(e.target.value)
					);
				}),
				authorsData
			);
		} else {
			renderMagazineTable(magazineData, authorsData);
		}
	});

	const renderTable = (tableID, headers, rows) => {
		const table = $('#' + tableID);
		const thead = table.find('thead');

		thead.empty();

		const theadRow = headers
			.map((header) => '<th>' + header.title + '</th>')
			.join('');

		thead.append(`
            <tr>${theadRow}
            </tr>
        `);

		const tbody = table.find('tbody');
		tbody.empty();

		const tbodyRow = rows.map((row) => {
			return (
				'<tr>' +
				row.map(
					(r, idx) =>
						`<td class="${
							headers[idx].value === 'title' ||
							headers[idx].value === 'description'
								? 'text-overflow'
								: ''
						}">` +
						r +
						'</td>'
				) +
				'</tr>'
			);
		});
		if (tbodyRow.length === 0) {
			return tbody.append(
				'<tr><td colspan="5" class="text-center">No Data available.</td></tr>'
			);
		}

		tbody.append(tbodyRow);
	};

	const renderBookTable = (data, authors) => {
		const headers = data[0].map((el) => ({
			title: el[0].toUpperCase() + el.substring(1),
			value: el.toLowerCase(),
		}));

		const rows = data
			.filter((_, idx) => idx > 0)
			.map((el) => {
				const updatedEl = [...el];
				const authorIdx = headers.findIndex((h) => h.value === 'authors');
				const authorEmails = updatedEl[authorIdx].split(',');
				// console.log('authorEmails:', authorEmails);
				const authorsData = authorEmails
					.map((email) => {
						const author = authors.find((a) => a[0] === email);
						return author[1] + ' ' + author[2];
					})
					.join(',<br>');

				updatedEl[authorIdx] = authorsData;
				return updatedEl;
			})
			.sort(function (a, b) {
				return a[0].localeCompare(b[0]);
			});

		renderTable('books-data', headers, rows);
	};

	const renderMagazineTable = (data, authors) => {
		const headers = data[0].map((el) => ({
			title: el[0].toUpperCase() + el.substring(1),
			value: el.toLowerCase(),
		}));

		const rows = data
			.filter((_, idx) => idx > 0)
			.map((el) => {
				const updatedEl = [...el];
				const authorIdx = headers.findIndex((h) => h.value === 'authors');
				const authorEmails = updatedEl[authorIdx].split(',');
				// console.log('authorEmails:', authorEmails);
				const authorsData = authorEmails
					.map((email) => {
						const author = authors.find((a) => a[0] === email);
						return author[1] + ' ' + author[2];
					})
					.join(',<br>');

				updatedEl[authorIdx] = authorsData;
				return updatedEl;
			})
			.sort(function (a, b) {
				return a[0].localeCompare(b[0]);
			});

		renderTable('magazine-data', headers, rows);
	};
});
