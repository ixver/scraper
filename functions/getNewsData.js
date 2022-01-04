import {resolveHref} from "next/dist/shared/lib/router/router";

const puppeteer = require("puppeteer");

// import {
//   get_listingsCites, get_listingsURLs, get_outputText,
//   set_driveMilestone, set_driveInput, set_driveClick
// } from '../../../functions/scraping';
// import { abc } from './manageFiles'

const set_driveMilestone = async (page, picLabel) => {
	page.waitForTimeout(1100).then(() => {
		if (picLabel) {
			page.screenshot({path: `${picLabel}.png`});
		}
	});
};

const set_driveInput = async (page, selector, input) => {
	await page.waitForTimeout(1100);
	await page.type(selector, input);
};

const set_driveClick = async (page, selector) => {
	await page.waitForTimeout(1100);
	await page.evaluate((selector) => document.querySelector(selector).click(), selector);
};

const get_listingsCites = async (page, citesList) => {
	await page
		.$$eval("a cite", (elements) => {
			return elements.map((element) => element.textContent);
		})
		.then((elements) => {
			for (const val of elements) {
				citesList.push(val);
				// console.log(citesList);
				return citesList;
			}
		});
};

const get_listingsURLs = async (page) => {
	function checkRelevance(alink) {
		return alink.includes("nyt");
	}
	let urlsList = await page.$$eval("a", (elements) => {
		return elements.map((el) => {
			// console.log(el.href);
			return el.href;
		});
	});
	urlsList = urlsList.filter(checkRelevance);
	console.log("urlsList", urlsList);
	if (urlsList.length > 4) {
		urlsList = urlsList.slice(0, 2);
	}

	return urlsList;
};

const get_outputText = async (page, urlsList, topic) => {
	let outputTextList = [];
	const filterByTopic = (text, topic) => {
		return text.tolowercase().includes(topic);
	};
	for await (const urlinput of urlsList) {
		let textFiltered = [];

		// await page.goto(urlinput)
		await page.goto(`http://${urlinput}`);
		await page.waitForTimeout(1100);

		const listingText = await page.$$eval("p", (elements) => {
			return elements.map((el) => el.textContent);
		});

		for (const lt of listingText) {
			if (filterByTopic(lt, topic)) {
				textFiltered.push(lt);
			}
		}

		outputTextList.push(`from source [${urlinput}]:        ${textFiltered.join(" ")}`);
		// console.log('outputTextList', outputTextList);

		// }

		// catch (err) {

		//   console.log('outputTextList', outputTextList)
		//   console.log('urlinput', urlinput)
		//   console.log('Error occured: ')
		//   // console.log('Error: ', err)
		// }
	}

	console.log("outputTextList", outputTextList);
	return outputTextList.join("        ");
};

const sourcesArr = {
	Time: "https://time.com/",
	"Scientific American": "https://www.scientificamerican.com/",
	Vice: "https://www.vice.com/en",
	"The Wallstreet Journal": "https://www.wsj.com/",
};
const getScrapeProcess = async (urlinput, topic) => {
	// try {
	const browser = await puppeteer.launch({
		headless: true,
		// executablePath: "/usr/bin/chromium-browser",
		args: ["--disable-gpu", "--disable-dev-shm-usage"],
	});
	const page = await browser.newPage();
	await page.setDefaultNavigationTimeout(0);

	// await page.goto(`${urlinput}`);
	// await set_driveMilestone(page, "1");

	// let urlsList = await get_listingsURLs(page);
	// await set_driveMilestone(page, '2');

	const dataOutput = await get_outputText(page, [urlinput], topic);
	// console.log("CHECK dataOutput", dataOutput);

	await browser.close();

	return dataOutput;
	// } catch (err) {
	// 	console.log("Error occured");
	// 	// console.log('Error: ', err)
	// 	return err;
	// }
};

const getNewsData_PREVIOUS = async (sites, topic) => {
	// console.log("INPUTS CHECK", sites, topic);
	// initialize
	const dataOutputs = await Promise.all(
		sites.map(async (site) => {
			console.log("\nurl:", site);

			const singleOutput = await getScrapeProcess(site, topic);
			console.log("CHECK SINGLEOUTPUT", singleOutput);
			return singleOutput;
		})
	);

	// TEST
	// const dataOutputs = articles;
	// console.log("dataOutputs", dataOutputs);

	return dataOutputs;
};

const getNewsData = async (urlsList, topic) => {
	let urlsListData = [];
	const browser = await puppeteer.launch({
		headless: true,
		ignoreHTTPSErrors: true,
		// executablePath: "/usr/bin/chromium-browser",
		// executablePath: "/app/node_modules/puppeteer/.local-chromium/win64-901912/chrome-win/chrome.exe",
		args: ["--disable-gpu", "--disable-dev-shm-usage"],
	});
	const page = await browser.newPage();
	await page.setDefaultNavigationTimeout(0);
	// await browser.close();
	// return urlsListData;
	for await (const urlinput of urlsList) {
		console.log("urlinput", urlinput, sourcesArr);
		let srcName = Object.keys(sourcesArr).find((k) => sourcesArr[k] == urlinput);
		await page.goto(`${urlinput}`);

		// SCRAPE SPECIFICATIONS HERE
		// await page.waitForTimeout(1100);
		await page.setDefaultNavigationTimeout(0);
		if (srcName == "Time") {
			await page.waitForSelector("article");
			await page.waitForSelector("a");
			await page.waitForSelector("p");
			await page
				.evaluate(() => {
					return Array.from(document.querySelectorAll("article")).map((item) => {
						return {
							url: item.querySelector("a").getAttribute("href") ? item.querySelector("a").getAttribute("href") : "",
							title: item.querySelector("h2") ? item.querySelector("h2").innerText : "",
							text: item.querySelector("p") ? item.querySelector("p").innerText : "",
						};
					});
				})
				.then((urlData) => {
					urlData = urlData
						.filter((item) => {
							return (
								(item.title.length > 0 && item.title.toLowerCase().includes(topic.toLowerCase())) ||
								(item.text.length > 0 && item.text.toLowerCase().includes(topic.toLowerCase()))
							);
						})
						.map((item) => {
							return {...item, srcname: srcName};
						});
					urlData && urlsListData.push(...urlData);
					console.log(urlsListData);
				});
		} else if (srcName == "Vice") {
			await page.waitForSelector("a");
			await page.waitForSelector("p");
			await page
				.evaluate(() => {
					return Array.from(document.querySelectorAll(".vice-card")).map((item) => {
						return {
							url: item.querySelector(".vice-card-hed__link").getAttribute("href")
								? item.querySelector(".vice-card-hed__link").getAttribute("href")
								: "",
							title: item.querySelector(".vice-card-hed") ? item.querySelector(".vice-card-hed").innerText : "",
							text: item.querySelector("p") ? item.querySelector("p").innerText : "",
							// url: item.querySelector("a").getAttribute("href"),
							// title: item.querySelector("h3").innerText,
							// text: item.querySelector("div.story-package-module__story__summary")
							// 	? item.querySelector("div.story-package-module__story__summary").innerText
							// 	: "",
						};
					});
				})
				.then((urlData) => {
					urlData = urlData
						.filter((item) => {
							return (
								(item.title.length > 0 && item.title.toLowerCase().includes(topic.toLowerCase())) ||
								(item.text.length > 0 && item.text.toLowerCase().includes(topic.toLowerCase()))
							);
						})
						.map((item) => {
							return {...item, srcname: srcName};
						});
					urlData && urlsListData.push(...urlData);
					console.log(urlsListData);
				});
		} else if (srcName == "The Wallstreet Journal") {
			await page.waitForSelector("article");
			await page.waitForSelector("a");
			await page.waitForSelector("p");
			await page
				.evaluate(() => {
					return Array.from(document.querySelectorAll("article")).map((item) => {
						return {
							url: item.querySelector("a").getAttribute("href") ? item.querySelector("a").getAttribute("href") : "",
							title: item.querySelector("h3") ? item.querySelector("h3").innerText : "",
							text: item.querySelector("p") ? item.querySelector("p").innerText : "",
						};
					});
				})
				.then((urlData) => {
					urlData = urlData
						.filter((item) => {
							return (
								(item.title.length > 0 && item.title.toLowerCase().includes(topic.toLowerCase())) ||
								(item.text.length > 0 && item.text.toLowerCase().includes(topic.toLowerCase()))
							);
						})
						.map((item) => {
							return {...item, srcname: srcName};
						});
					urlData && urlsListData.push(...urlData);
					console.log(urlsListData);
				});
		} else if (srcName == "Scientific American") {
			await page.waitForSelector("article");
			await page.waitForSelector("a");
			await page.waitForSelector("p");
			await page
				.evaluate(() => {
					return Array.from(document.querySelectorAll("article")).map((item) => {
						return {
							url: item.querySelector("a").getAttribute("href") ? item.querySelector("a").getAttribute("href") : "",
							title: item.querySelector("h2") ? item.querySelector("h2").innerText : "",
							text: item.querySelector("p") ? item.querySelector("p").innerText : "",
						};
					});
				})
				.then((urlData) => {
					urlData = urlData
						.filter((item) => {
							return (
								(item.title.length > 0 && item.title.toLowerCase().includes(topic.toLowerCase())) ||
								(item.text.length > 0 && item.text.toLowerCase().includes(topic.toLowerCase()))
							);
						})
						.map((item) => {
							return {...item, srcname: srcName};
						});
					urlData && urlsListData.push(...urlData);
					console.log(urlsListData);
				});
		}
	}
	await browser.close();
	return urlsListData;
};

const articles = [
	{
		srcname: "New York Times",
		title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
		text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
		url: "www.askljdfjklsdf.com",
	},
	{
		srcname: "New York Times",
		title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
		text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
		url: "www.askljdfjklsdf.com",
	},
	{
		srcname: "New York Times",
		title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
		text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
		url: "www.askljdfjklsdf.com",
	},
	{
		srcname: "New York Times",
		title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
		text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
		url: "www.askljdfjklsdf.com",
	},
	{
		srcname: "New York Times",
		title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
		text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
		url: "www.askljdfjklsdf.com",
	},
	{
		srcname: "New York Times",
		title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
		text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
		url: "www.askljdfjklsdf.com",
	},
];
export default getNewsData;
