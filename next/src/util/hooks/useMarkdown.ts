export const linkRegex =
  /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;

export const mentionRegex = /([@])\w+/g;

export const useMarkdown = (text: string): string => {
  var test = text + " and this: https://www.google.com";
  const links = test.match(linkRegex);
  const mentions = test.match(mentionRegex);

  if (!links && !mentions) return text;

  console.log(chunkSubstr(text, 10));
  var a = split([test], links!);

  return text;
};

const split = (arr: Array<string>, factor: Array<string>) => {
  var changed = Array<string>();

  arr.forEach((str) => {
    var s = str.split(" ");
    var a = Array<string>();

    factor.forEach((val) => {
      const i = s.indexOf(val);
      s.splice(i, 1);
      a.push(s.join(" "));
      a.push(val);
      changed.push(...a);
    });
  });

  return changed;
};

function chunkSubstr(str: string, size: number) {
  const numChunks = Math.ceil(str.length / size);
  const chunks = new Array(numChunks);

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size);
  }

  return chunks;
}
