function showSearchingBar() {
  var rmednd = 0;
  var mkls = document.querySelectorAll("mark.search-keyword");
  if(mkls.length == 0) {Toast.fire({icon:"warning", text:"没有搜索结果"}); return;}
  var mkheight = [];
  for(let i = 0; i < mkls.length - rmednd; i++) {
      var ofPart = mkls[i].offsetParent;
      if(ofPart == null) {
          mkls[i] = undefined;
          --i;
          ++rmednd;
          continue;
      }
      mkheight[i] = mkls[i].offsetTop;
      while(String(ofPart) != "[object HTMLBodyElement]") {
          mkheight[i] += ofPart.offsetTop;
          ofPart = ofPart.offsetParent;
      }
  }
  if(mkls.length - rmednd == 0) {Toast.fire({icon:"warning", text:"没有搜索结果"}); return;}

  var scDiv = document.createElement("div");
  scDiv.className = "search-results-container";
  scDiv.innerHTML = `<span>搜索结果 </span><span class="count">1/${mkheight.length}</span><button class="bef-btn"><i class="fa fa-arrow-up fa-fw"></i></button><button class="aft-btn"><i class="fa fa-arrow-down fa-fw"></i></button><button class="cls-btn"><i class="fa fa-xmark fa-fw"></i></button>`;
  document.querySelector("body").appendChild(scDiv);
  
  window.searchNumber = 0;
  window.anime({
      targets: document.scrollingElement,
      duration: 200,
      easing: "linear",
      scrollTop: mkheight[window.searchNumber]
  });
  document.querySelector("div.search-results-container button.bef-btn").addEventListener("click", () => {
      if(window.searchNumber <= 0)
      {
          window.searchNumber = mkheight.length;
      }
      window.anime({
          targets: document.scrollingElement,
          duration: 500,
          easing: "linear",
          scrollTop: mkheight[--window.searchNumber]
      });
      document.querySelector("div.search-results-container span.count").innerHTML = `${window.searchNumber + 1}/${mkheight.length}`;
  });
  document.querySelector("div.search-results-container button.aft-btn").addEventListener("click", () => {
      if(window.searchNumber >= mkheight.length - 1)
      {
          window.searchNumber = -1;
      }
      window.anime({
          targets: document.scrollingElement,
          duration: 500,
          easing: "linear",
          scrollTop: mkheight[++window.searchNumber]
      });
      document.querySelector("div.search-results-container span.count").innerHTML = `${window.searchNumber + 1}/${mkheight.length}`;
  });
  document.querySelector("div.search-results-container button.cls-btn").addEventListener("click", () => {
      document.querySelector("div.search-results-container").remove();
      const nowurl = new URL(location.href);
      location.href = nowurl.origin + nowurl.pathname;
  });
}
class LocalSearch {
  constructor({
    path = '',
    unescape = false,
    top_n_per_article = 1
  }) {
    this.path = path;
    this.unescape = unescape;
    this.top_n_per_article = top_n_per_article;
    this.isfetched = false;
    this.datas = null;
  }

  getIndexByWord(words, text, caseSensitive = false) {
    const index = [];
    const included = new Set();

    if (!caseSensitive) {
      text = text.toLowerCase();
    }
    words.forEach(word => {
      if (this.unescape) {
        const div = document.createElement('div');
        div.innerText = word;
        word = div.innerHTML;
      }
      const wordLen = word.length;
      if (wordLen === 0) return;
      let startPosition = 0;
      let position = -1;
      if (!caseSensitive) {
        word = word.toLowerCase();
      }
      while ((position = text.indexOf(word, startPosition)) > -1) {
        index.push({ position, word });
        included.add(word);
        startPosition = position + wordLen;
      }
    });
    // Sort index by position of keyword
    index.sort((left, right) => {
      if (left.position !== right.position) {
        return left.position - right.position;
      }
      return right.word.length - left.word.length;
    });
    return [index, included];
  }

  // Merge hits into slices
  mergeIntoSlice(start, end, index) {
    let item = index[0];
    let { position, word } = item;
    const hits = [];
    const count = new Set();
    while (position + word.length <= end && index.length !== 0) {
      count.add(word);
      hits.push({
        position,
        length: word.length
      });
      const wordEnd = position + word.length;

      // Move to next position of hit
      index.shift();
      while (index.length !== 0) {
        item = index[0];
        position = item.position;
        word = item.word;
        if (wordEnd > position) {
          index.shift();
        } else {
          break;
        }
      }
    }
    return {
      hits,
      start,
      end,
      count: count.size
    };
  }

  // Highlight title and content
  highlightKeyword(val, slice) {
    let result = '';
    let index = slice.start;
    for (const { position, length } of slice.hits) {
      result += val.substring(index, position);
      index = position + length;
      result += `<mark class="search-keyword">${val.substr(position, length)}</mark>`;
    }
    result += val.substring(index, slice.end);
    return result;
  }

  getResultItems(keywords) {
    const resultItems = [];
    this.datas.forEach(({ title, content, url }) => {
      // The number of different keywords included in the article.
      const [indexOfTitle, keysOfTitle] = this.getIndexByWord(keywords, title);
      const [indexOfContent, keysOfContent] = this.getIndexByWord(keywords, content);
      const includedCount = new Set([...keysOfTitle, ...keysOfContent]).size;

      // Show search results
      const hitCount = indexOfTitle.length + indexOfContent.length;
      if (hitCount === 0) return;

      const slicesOfTitle = [];
      if (indexOfTitle.length !== 0) {
        slicesOfTitle.push(this.mergeIntoSlice(0, title.length, indexOfTitle));
      }

      let slicesOfContent = [];
      while (indexOfContent.length !== 0) {
        const item = indexOfContent[0];
        const { position } = item;
        // Cut out 100 characters. The maxlength of .search-input is 80.
        const start = Math.max(0, position - 20);
        const end = Math.min(content.length, position + 80);
        slicesOfContent.push(this.mergeIntoSlice(start, end, indexOfContent));
      }

      // Sort slices in content by included keywords' count and hits' count
      slicesOfContent.sort((left, right) => {
        if (left.count !== right.count) {
          return right.count - left.count;
        } else if (left.hits.length !== right.hits.length) {
          return right.hits.length - left.hits.length;
        }
        return left.start - right.start;
      });

      // Select top N slices in content
      const upperBound = parseInt(this.top_n_per_article, 10);
      if (upperBound >= 0) {
        slicesOfContent = slicesOfContent.slice(0, upperBound);
      }

      let resultItem = '';

      url = new URL(url, location.origin);
      url.searchParams.append('highlight', keywords.join(' '));

      if (slicesOfTitle.length !== 0) {
        resultItem += `<li><a href="${url.href}" class="search-result-title">${this.highlightKeyword(title, slicesOfTitle[0])}</a>`;
      } else {
        resultItem += `<li><a href="${url.href}" class="search-result-title">${title}</a>`;
      }

      slicesOfContent.forEach(slice => {
        resultItem += `<a href="${url.href}"><p class="search-result">${this.highlightKeyword(content, slice)}...</p></a>`;
      });

      resultItem += '</li>';
      resultItems.push({
        item: resultItem,
        id  : resultItems.length,
        hitCount,
        includedCount
      });
    });
    return resultItems;
  }

  fetchData() {
    const isXml = !this.path.endsWith('json');
    fetch(this.path)
      .then(response => response.text())
      .then(res => {
        // Get the contents from search data
        this.isfetched = true;
        this.datas = isXml ? [...new DOMParser().parseFromString(res, 'text/xml').querySelectorAll('entry')].map(element => ({
          title  : element.querySelector('title').textContent,
          content: element.querySelector('content').textContent,
          url    : element.querySelector('url').textContent
        })) : JSON.parse(res);
        // Only match articles with non-empty titles
        this.datas = this.datas.filter(data => data.title).map(data => {
          data.title = data.title.trim();
          data.content = data.content ? data.content.trim().replace(/<[^>]+>/g, '') : '';
          data.url = decodeURIComponent(data.url).replace(/\/{2,}/g, '/');
          return data;
        });
        // Remove loading animation
        window.dispatchEvent(new Event('search:loaded'));
      });
  }

  // Highlight by wrapping node in mark elements with the given class name
  highlightText(node, slice, className) {
    const val = node.nodeValue;
    let index = slice.start;
    const children = [];
    for (const { position, length } of slice.hits) {
      const text = document.createTextNode(val.substring(index, position));
      index = position + length;
      const mark = document.createElement('mark');
      mark.className = className;
      mark.appendChild(document.createTextNode(val.substr(position, length)));
      children.push(text, mark);
    }
    node.nodeValue = val.substring(index, slice.end);
    children.forEach(element => {
      node.parentNode.insertBefore(element, node);
    });
  }

  // Highlight the search words provided in the url in the text
  highlightSearchWords(body) {
    const params = new URL(location.href).searchParams.get('highlight');
    const nowurl = new URL(location.href);
    if(nowurl.pathname.slice(0, 7) != "/posts/" && params != null) {
      console.log("Change to");
      window.stop();
      Swal.fire({
        icon: "warning",
        title: "重定向",
        html: "<span>非文章页面，请<strong>不要强制高亮词汇</strong>，否则会出现问题<br><del>你是不是特意想找 bug（狗头保命）</del><br>五秒后自动重定向，减去 URL 的参数</span>",
        confirmButtonText: "现在重定向",
        timer: 5000,
        timerProgressBar: true
      }).then(() => {location.href = nowurl.origin + nowurl.pathname;});
    }
    const keywords = params ? params.split(' ') : [];
    if (!keywords.length || !body) return;
    const walk = document.createTreeWalker(body, NodeFilter.SHOW_TEXT, null);
    const allNodes = [];
    while (walk.nextNode()) {
      if (!walk.currentNode.parentNode.matches('script, style, button, select, textarea, .mermaid')) allNodes.push(walk.currentNode);
    }
    allNodes.forEach(node => {
      const [indexOfNode] = this.getIndexByWord(keywords, node.nodeValue);
      if (!indexOfNode.length) return;
      const slice = this.mergeIntoSlice(0, node.nodeValue.length, indexOfNode);
      this.highlightText(node, slice, 'search-keyword');
    });
    window.addEventListener("load", showSearchingBar);
  }
}

