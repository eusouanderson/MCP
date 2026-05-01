#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/.pnpm/emoji-regex@10.6.0/node_modules/emoji-regex/index.js
var require_emoji_regex = __commonJS({
  "node_modules/.pnpm/emoji-regex@10.6.0/node_modules/emoji-regex/index.js"(exports2, module2) {
    module2.exports = () => {
      return /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E-\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED8\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDD1D\uDEEF]\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE]|[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE]|\uDEEF\u200D\uD83D\uDC69\uD83C[\uDFFB-\uDFFE])))?))?|\uDD75(?:\uD83C[\uDFFB-\uDFFF]|\uFE0F)?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3C-\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE8A\uDE8E-\uDEC2\uDEC6\uDEC8\uDECD-\uDEDC\uDEDF-\uDEEA\uDEEF]|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC30\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE])|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3\uDE70]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF]|\uDEEF\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
    };
  }
});

// node_modules/.pnpm/cli-boxes@3.0.0/node_modules/cli-boxes/boxes.json
var require_boxes = __commonJS({
  "node_modules/.pnpm/cli-boxes@3.0.0/node_modules/cli-boxes/boxes.json"(exports2, module2) {
    module2.exports = {
      single: {
        topLeft: "\u250C",
        top: "\u2500",
        topRight: "\u2510",
        right: "\u2502",
        bottomRight: "\u2518",
        bottom: "\u2500",
        bottomLeft: "\u2514",
        left: "\u2502"
      },
      double: {
        topLeft: "\u2554",
        top: "\u2550",
        topRight: "\u2557",
        right: "\u2551",
        bottomRight: "\u255D",
        bottom: "\u2550",
        bottomLeft: "\u255A",
        left: "\u2551"
      },
      round: {
        topLeft: "\u256D",
        top: "\u2500",
        topRight: "\u256E",
        right: "\u2502",
        bottomRight: "\u256F",
        bottom: "\u2500",
        bottomLeft: "\u2570",
        left: "\u2502"
      },
      bold: {
        topLeft: "\u250F",
        top: "\u2501",
        topRight: "\u2513",
        right: "\u2503",
        bottomRight: "\u251B",
        bottom: "\u2501",
        bottomLeft: "\u2517",
        left: "\u2503"
      },
      singleDouble: {
        topLeft: "\u2553",
        top: "\u2500",
        topRight: "\u2556",
        right: "\u2551",
        bottomRight: "\u255C",
        bottom: "\u2500",
        bottomLeft: "\u2559",
        left: "\u2551"
      },
      doubleSingle: {
        topLeft: "\u2552",
        top: "\u2550",
        topRight: "\u2555",
        right: "\u2502",
        bottomRight: "\u255B",
        bottom: "\u2550",
        bottomLeft: "\u2558",
        left: "\u2502"
      },
      classic: {
        topLeft: "+",
        top: "-",
        topRight: "+",
        right: "|",
        bottomRight: "+",
        bottom: "-",
        bottomLeft: "+",
        left: "|"
      },
      arrow: {
        topLeft: "\u2198",
        top: "\u2193",
        topRight: "\u2199",
        right: "\u2190",
        bottomRight: "\u2196",
        bottom: "\u2191",
        bottomLeft: "\u2197",
        left: "\u2192"
      }
    };
  }
});

// node_modules/.pnpm/cli-boxes@3.0.0/node_modules/cli-boxes/index.js
var require_cli_boxes = __commonJS({
  "node_modules/.pnpm/cli-boxes@3.0.0/node_modules/cli-boxes/index.js"(exports2, module2) {
    "use strict";
    var cliBoxes2 = require_boxes();
    module2.exports = cliBoxes2;
    module2.exports.default = cliBoxes2;
  }
});

// node_modules/.pnpm/ansi-regex@5.0.1/node_modules/ansi-regex/index.js
var require_ansi_regex = __commonJS({
  "node_modules/.pnpm/ansi-regex@5.0.1/node_modules/ansi-regex/index.js"(exports2, module2) {
    "use strict";
    module2.exports = ({ onlyFirst = false } = {}) => {
      const pattern = [
        "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
        "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
      ].join("|");
      return new RegExp(pattern, onlyFirst ? void 0 : "g");
    };
  }
});

// node_modules/.pnpm/strip-ansi@6.0.1/node_modules/strip-ansi/index.js
var require_strip_ansi = __commonJS({
  "node_modules/.pnpm/strip-ansi@6.0.1/node_modules/strip-ansi/index.js"(exports2, module2) {
    "use strict";
    var ansiRegex2 = require_ansi_regex();
    module2.exports = (string) => typeof string === "string" ? string.replace(ansiRegex2(), "") : string;
  }
});

// node_modules/.pnpm/is-fullwidth-code-point@3.0.0/node_modules/is-fullwidth-code-point/index.js
var require_is_fullwidth_code_point = __commonJS({
  "node_modules/.pnpm/is-fullwidth-code-point@3.0.0/node_modules/is-fullwidth-code-point/index.js"(exports2, module2) {
    "use strict";
    var isFullwidthCodePoint = (codePoint) => {
      if (Number.isNaN(codePoint)) {
        return false;
      }
      if (codePoint >= 4352 && (codePoint <= 4447 || // Hangul Jamo
      codePoint === 9001 || // LEFT-POINTING ANGLE BRACKET
      codePoint === 9002 || // RIGHT-POINTING ANGLE BRACKET
      // CJK Radicals Supplement .. Enclosed CJK Letters and Months
      11904 <= codePoint && codePoint <= 12871 && codePoint !== 12351 || // Enclosed CJK Letters and Months .. CJK Unified Ideographs Extension A
      12880 <= codePoint && codePoint <= 19903 || // CJK Unified Ideographs .. Yi Radicals
      19968 <= codePoint && codePoint <= 42182 || // Hangul Jamo Extended-A
      43360 <= codePoint && codePoint <= 43388 || // Hangul Syllables
      44032 <= codePoint && codePoint <= 55203 || // CJK Compatibility Ideographs
      63744 <= codePoint && codePoint <= 64255 || // Vertical Forms
      65040 <= codePoint && codePoint <= 65049 || // CJK Compatibility Forms .. Small Form Variants
      65072 <= codePoint && codePoint <= 65131 || // Halfwidth and Fullwidth Forms
      65281 <= codePoint && codePoint <= 65376 || 65504 <= codePoint && codePoint <= 65510 || // Kana Supplement
      110592 <= codePoint && codePoint <= 110593 || // Enclosed Ideographic Supplement
      127488 <= codePoint && codePoint <= 127569 || // CJK Unified Ideographs Extension B .. Tertiary Ideographic Plane
      131072 <= codePoint && codePoint <= 262141)) {
        return true;
      }
      return false;
    };
    module2.exports = isFullwidthCodePoint;
    module2.exports.default = isFullwidthCodePoint;
  }
});

// node_modules/.pnpm/emoji-regex@8.0.0/node_modules/emoji-regex/index.js
var require_emoji_regex2 = __commonJS({
  "node_modules/.pnpm/emoji-regex@8.0.0/node_modules/emoji-regex/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function() {
      return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F|\uD83D\uDC68(?:\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68\uD83C\uDFFB|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|[\u2695\u2696\u2708]\uFE0F|\uD83D[\uDC66\uDC67]|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708])\uFE0F|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C[\uDFFB-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)\uD83C\uDFFB|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB\uDFFC])|\uD83D\uDC69(?:\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB-\uDFFD])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83C\uDFF4\u200D\u2620)\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDF6\uD83C\uDDE6|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDBB\uDDD2-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5\uDEEB\uDEEC\uDEF4-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
    };
  }
});

// node_modules/.pnpm/string-width@4.2.3/node_modules/string-width/index.js
var require_string_width = __commonJS({
  "node_modules/.pnpm/string-width@4.2.3/node_modules/string-width/index.js"(exports2, module2) {
    "use strict";
    var stripAnsi2 = require_strip_ansi();
    var isFullwidthCodePoint = require_is_fullwidth_code_point();
    var emojiRegex2 = require_emoji_regex2();
    var stringWidth3 = (string) => {
      if (typeof string !== "string" || string.length === 0) {
        return 0;
      }
      string = stripAnsi2(string);
      if (string.length === 0) {
        return 0;
      }
      string = string.replace(emojiRegex2(), "  ");
      let width = 0;
      for (let i = 0; i < string.length; i++) {
        const code = string.codePointAt(i);
        if (code <= 31 || code >= 127 && code <= 159) {
          continue;
        }
        if (code >= 768 && code <= 879) {
          continue;
        }
        if (code > 65535) {
          i++;
        }
        width += isFullwidthCodePoint(code) ? 2 : 1;
      }
      return width;
    };
    module2.exports = stringWidth3;
    module2.exports.default = stringWidth3;
  }
});

// node_modules/.pnpm/ansi-align@3.0.1/node_modules/ansi-align/index.js
var require_ansi_align = __commonJS({
  "node_modules/.pnpm/ansi-align@3.0.1/node_modules/ansi-align/index.js"(exports2, module2) {
    "use strict";
    var stringWidth3 = require_string_width();
    function ansiAlign2(text, opts) {
      if (!text) return text;
      opts = opts || {};
      const align = opts.align || "center";
      if (align === "left") return text;
      const split = opts.split || "\n";
      const pad = opts.pad || " ";
      const widthDiffFn = align !== "right" ? halfDiff : fullDiff;
      let returnString = false;
      if (!Array.isArray(text)) {
        returnString = true;
        text = String(text).split(split);
      }
      let width;
      let maxWidth = 0;
      text = text.map(function(str) {
        str = String(str);
        width = stringWidth3(str);
        maxWidth = Math.max(width, maxWidth);
        return {
          str,
          width
        };
      }).map(function(obj) {
        return new Array(widthDiffFn(maxWidth, obj.width) + 1).join(pad) + obj.str;
      });
      return returnString ? text.join(split) : text;
    }
    ansiAlign2.left = function left(text) {
      return ansiAlign2(text, { align: "left" });
    };
    ansiAlign2.center = function center(text) {
      return ansiAlign2(text, { align: "center" });
    };
    ansiAlign2.right = function right(text) {
      return ansiAlign2(text, { align: "right" });
    };
    module2.exports = ansiAlign2;
    function halfDiff(maxWidth, curWidth) {
      return Math.floor((maxWidth - curWidth) / 2);
    }
    function fullDiff(maxWidth, curWidth) {
      return maxWidth - curWidth;
    }
  }
});

// node_modules/.pnpm/dotenv@17.4.2/node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "node_modules/.pnpm/dotenv@17.4.2/node_modules/dotenv/lib/main.js"(exports2, module2) {
    var fs = require("fs");
    var path6 = require("path");
    var os2 = require("os");
    var crypto = require("crypto");
    var TIPS = [
      "\u25C8 encrypted .env [www.dotenvx.com]",
      "\u25C8 secrets for agents [www.dotenvx.com]",
      "\u2301 auth for agents [www.vestauth.com]",
      "\u2318 custom filepath { path: '/custom/path/.env' }",
      "\u2318 enable debugging { debug: true }",
      "\u2318 override existing { override: true }",
      "\u2318 suppress logs { quiet: true }",
      "\u2318 multiple files { path: ['.env.local', '.env'] }"
    ];
    function _getRandomTip() {
      return TIPS[Math.floor(Math.random() * TIPS.length)];
    }
    function parseBoolean(value) {
      if (typeof value === "string") {
        return !["false", "0", "no", "off", ""].includes(value.toLowerCase());
      }
      return Boolean(value);
    }
    function supportsAnsi() {
      return process.stdout.isTTY;
    }
    function dim2(text) {
      return supportsAnsi() ? `\x1B[2m${text}\x1B[0m` : text;
    }
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match;
      while ((match = LINE.exec(lines)) != null) {
        const key = match[1];
        let value = match[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    function _parseVault(options) {
      options = options || {};
      const vaultPath = _vaultPath(options);
      options.path = vaultPath;
      const result = DotenvModule.configDotenv(options);
      if (!result.parsed) {
        const err = new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`);
        err.code = "MISSING_DATA";
        throw err;
      }
      const keys = _dotenvKey(options).split(",");
      const length = keys.length;
      let decrypted;
      for (let i = 0; i < length; i++) {
        try {
          const key = keys[i].trim();
          const attrs = _instructions(result, key);
          decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key);
          break;
        } catch (error3) {
          if (i + 1 >= length) {
            throw error3;
          }
        }
      }
      return DotenvModule.parse(decrypted);
    }
    function _warn(message2) {
      console.error(`\u26A0 ${message2}`);
    }
    function _debug(message2) {
      console.log(`\u2506 ${message2}`);
    }
    function _log(message2) {
      console.log(`\u25C7 ${message2}`);
    }
    function _dotenvKey(options) {
      if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {
        return options.DOTENV_KEY;
      }
      if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {
        return process.env.DOTENV_KEY;
      }
      return "";
    }
    function _instructions(result, dotenvKey) {
      let uri;
      try {
        uri = new URL(dotenvKey);
      } catch (error3) {
        if (error3.code === "ERR_INVALID_URL") {
          const err = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        }
        throw error3;
      }
      const key = uri.password;
      if (!key) {
        const err = new Error("INVALID_DOTENV_KEY: Missing key part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environment = uri.searchParams.get("environment");
      if (!environment) {
        const err = new Error("INVALID_DOTENV_KEY: Missing environment part");
        err.code = "INVALID_DOTENV_KEY";
        throw err;
      }
      const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`;
      const ciphertext = result.parsed[environmentKey];
      if (!ciphertext) {
        const err = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`);
        err.code = "NOT_FOUND_DOTENV_ENVIRONMENT";
        throw err;
      }
      return { ciphertext, key };
    }
    function _vaultPath(options) {
      let possibleVaultPath = null;
      if (options && options.path && options.path.length > 0) {
        if (Array.isArray(options.path)) {
          for (const filepath of options.path) {
            if (fs.existsSync(filepath)) {
              possibleVaultPath = filepath.endsWith(".vault") ? filepath : `${filepath}.vault`;
            }
          }
        } else {
          possibleVaultPath = options.path.endsWith(".vault") ? options.path : `${options.path}.vault`;
        }
      } else {
        possibleVaultPath = path6.resolve(process.cwd(), ".env.vault");
      }
      if (fs.existsSync(possibleVaultPath)) {
        return possibleVaultPath;
      }
      return null;
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path6.join(os2.homedir(), envPath.slice(1)) : envPath;
    }
    function _configVault(options) {
      const debug = parseBoolean(process.env.DOTENV_CONFIG_DEBUG || options && options.debug);
      const quiet = parseBoolean(process.env.DOTENV_CONFIG_QUIET || options && options.quiet);
      if (debug || !quiet) {
        _log("loading env from encrypted .env.vault");
      }
      const parsed = DotenvModule._parseVault(options);
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsed, options);
      return { parsed };
    }
    function configDotenv(options) {
      const dotenvPath = path6.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      let debug = parseBoolean(processEnv.DOTENV_CONFIG_DEBUG || options && options.debug);
      let quiet = parseBoolean(processEnv.DOTENV_CONFIG_QUIET || options && options.quiet);
      if (options && options.encoding) {
        encoding = options.encoding;
      } else {
        if (debug) {
          _debug("no encoding is specified (UTF-8 is used by default)");
        }
      }
      let optionPaths = [dotenvPath];
      if (options && options.path) {
        if (!Array.isArray(options.path)) {
          optionPaths = [_resolveHome(options.path)];
        } else {
          optionPaths = [];
          for (const filepath of options.path) {
            optionPaths.push(_resolveHome(filepath));
          }
        }
      }
      let lastError;
      const parsedAll = {};
      for (const path7 of optionPaths) {
        try {
          const parsed = DotenvModule.parse(fs.readFileSync(path7, { encoding }));
          DotenvModule.populate(parsedAll, parsed, options);
        } catch (e) {
          if (debug) {
            _debug(`failed to load ${path7} ${e.message}`);
          }
          lastError = e;
        }
      }
      const populated = DotenvModule.populate(processEnv, parsedAll, options);
      debug = parseBoolean(processEnv.DOTENV_CONFIG_DEBUG || debug);
      quiet = parseBoolean(processEnv.DOTENV_CONFIG_QUIET || quiet);
      if (debug || !quiet) {
        const keysCount = Object.keys(populated).length;
        const shortPaths = [];
        for (const filePath of optionPaths) {
          try {
            const relative = path6.relative(process.cwd(), filePath);
            shortPaths.push(relative);
          } catch (e) {
            if (debug) {
              _debug(`failed to load ${filePath} ${e.message}`);
            }
            lastError = e;
          }
        }
        _log(`injected env (${keysCount}) from ${shortPaths.join(",")} ${dim2(`// tip: ${_getRandomTip()}`)}`);
      }
      if (lastError) {
        return { parsed: parsedAll, error: lastError };
      } else {
        return { parsed: parsedAll };
      }
    }
    function config(options) {
      if (_dotenvKey(options).length === 0) {
        return DotenvModule.configDotenv(options);
      }
      const vaultPath = _vaultPath(options);
      if (!vaultPath) {
        _warn(`you set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}`);
        return DotenvModule.configDotenv(options);
      }
      return DotenvModule._configVault(options);
    }
    function decrypt(encrypted, keyStr) {
      const key = Buffer.from(keyStr.slice(-64), "hex");
      let ciphertext = Buffer.from(encrypted, "base64");
      const nonce = ciphertext.subarray(0, 12);
      const authTag = ciphertext.subarray(-16);
      ciphertext = ciphertext.subarray(12, -16);
      try {
        const aesgcm = crypto.createDecipheriv("aes-256-gcm", key, nonce);
        aesgcm.setAuthTag(authTag);
        return `${aesgcm.update(ciphertext)}${aesgcm.final()}`;
      } catch (error3) {
        const isRange = error3 instanceof RangeError;
        const invalidKeyLength = error3.message === "Invalid key length";
        const decryptionFailed = error3.message === "Unsupported state or unable to authenticate data";
        if (isRange || invalidKeyLength) {
          const err = new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");
          err.code = "INVALID_DOTENV_KEY";
          throw err;
        } else if (decryptionFailed) {
          const err = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
          err.code = "DECRYPTION_FAILED";
          throw err;
        } else {
          throw error3;
        }
      }
    }
    function populate(processEnv, parsed, options = {}) {
      const debug = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      const populated = {};
      if (typeof parsed !== "object") {
        const err = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
        err.code = "OBJECT_REQUIRED";
        throw err;
      }
      for (const key of Object.keys(parsed)) {
        if (Object.prototype.hasOwnProperty.call(processEnv, key)) {
          if (override === true) {
            processEnv[key] = parsed[key];
            populated[key] = parsed[key];
          }
          if (debug) {
            if (override === true) {
              _debug(`"${key}" is already defined and WAS overwritten`);
            } else {
              _debug(`"${key}" is already defined and was NOT overwritten`);
            }
          }
        } else {
          processEnv[key] = parsed[key];
          populated[key] = parsed[key];
        }
      }
      return populated;
    }
    var DotenvModule = {
      configDotenv,
      _configVault,
      _parseVault,
      config,
      decrypt,
      parse,
      populate
    };
    module2.exports.configDotenv = DotenvModule.configDotenv;
    module2.exports._configVault = DotenvModule._configVault;
    module2.exports._parseVault = DotenvModule._parseVault;
    module2.exports.config = DotenvModule.config;
    module2.exports.decrypt = DotenvModule.decrypt;
    module2.exports.parse = DotenvModule.parse;
    module2.exports.populate = DotenvModule.populate;
    module2.exports = DotenvModule;
  }
});

// node_modules/.pnpm/dotenv@17.4.2/node_modules/dotenv/lib/env-options.js
var require_env_options = __commonJS({
  "node_modules/.pnpm/dotenv@17.4.2/node_modules/dotenv/lib/env-options.js"(exports2, module2) {
    var options = {};
    if (process.env.DOTENV_CONFIG_ENCODING != null) {
      options.encoding = process.env.DOTENV_CONFIG_ENCODING;
    }
    if (process.env.DOTENV_CONFIG_PATH != null) {
      options.path = process.env.DOTENV_CONFIG_PATH;
    }
    if (process.env.DOTENV_CONFIG_QUIET != null) {
      options.quiet = process.env.DOTENV_CONFIG_QUIET;
    }
    if (process.env.DOTENV_CONFIG_DEBUG != null) {
      options.debug = process.env.DOTENV_CONFIG_DEBUG;
    }
    if (process.env.DOTENV_CONFIG_OVERRIDE != null) {
      options.override = process.env.DOTENV_CONFIG_OVERRIDE;
    }
    if (process.env.DOTENV_CONFIG_DOTENV_KEY != null) {
      options.DOTENV_KEY = process.env.DOTENV_CONFIG_DOTENV_KEY;
    }
    module2.exports = options;
  }
});

// node_modules/.pnpm/dotenv@17.4.2/node_modules/dotenv/lib/cli-options.js
var require_cli_options = __commonJS({
  "node_modules/.pnpm/dotenv@17.4.2/node_modules/dotenv/lib/cli-options.js"(exports2, module2) {
    var re = /^dotenv_config_(encoding|path|quiet|debug|override|DOTENV_KEY)=(.+)$/;
    module2.exports = function optionMatcher(args) {
      const options = args.reduce(function(acc, cur) {
        const matches = cur.match(re);
        if (matches) {
          acc[matches[1]] = matches[2];
        }
        return acc;
      }, {});
      if (!("quiet" in options)) {
        options.quiet = "true";
      }
      return options;
    };
  }
});

// node_modules/.pnpm/ansi-colors@4.1.3/node_modules/ansi-colors/symbols.js
var require_symbols = __commonJS({
  "node_modules/.pnpm/ansi-colors@4.1.3/node_modules/ansi-colors/symbols.js"(exports2, module2) {
    "use strict";
    var isHyper = typeof process !== "undefined" && process.env.TERM_PROGRAM === "Hyper";
    var isWindows = typeof process !== "undefined" && process.platform === "win32";
    var isLinux = typeof process !== "undefined" && process.platform === "linux";
    var common = {
      ballotDisabled: "\u2612",
      ballotOff: "\u2610",
      ballotOn: "\u2611",
      bullet: "\u2022",
      bulletWhite: "\u25E6",
      fullBlock: "\u2588",
      heart: "\u2764",
      identicalTo: "\u2261",
      line: "\u2500",
      mark: "\u203B",
      middot: "\xB7",
      minus: "\uFF0D",
      multiplication: "\xD7",
      obelus: "\xF7",
      pencilDownRight: "\u270E",
      pencilRight: "\u270F",
      pencilUpRight: "\u2710",
      percent: "%",
      pilcrow2: "\u2761",
      pilcrow: "\xB6",
      plusMinus: "\xB1",
      question: "?",
      section: "\xA7",
      starsOff: "\u2606",
      starsOn: "\u2605",
      upDownArrow: "\u2195"
    };
    var windows = Object.assign({}, common, {
      check: "\u221A",
      cross: "\xD7",
      ellipsisLarge: "...",
      ellipsis: "...",
      info: "i",
      questionSmall: "?",
      pointer: ">",
      pointerSmall: "\xBB",
      radioOff: "( )",
      radioOn: "(*)",
      warning: "\u203C"
    });
    var other = Object.assign({}, common, {
      ballotCross: "\u2718",
      check: "\u2714",
      cross: "\u2716",
      ellipsisLarge: "\u22EF",
      ellipsis: "\u2026",
      info: "\u2139",
      questionFull: "\uFF1F",
      questionSmall: "\uFE56",
      pointer: isLinux ? "\u25B8" : "\u276F",
      pointerSmall: isLinux ? "\u2023" : "\u203A",
      radioOff: "\u25EF",
      radioOn: "\u25C9",
      warning: "\u26A0"
    });
    module2.exports = isWindows && !isHyper ? windows : other;
    Reflect.defineProperty(module2.exports, "common", { enumerable: false, value: common });
    Reflect.defineProperty(module2.exports, "windows", { enumerable: false, value: windows });
    Reflect.defineProperty(module2.exports, "other", { enumerable: false, value: other });
  }
});

// node_modules/.pnpm/ansi-colors@4.1.3/node_modules/ansi-colors/index.js
var require_ansi_colors = __commonJS({
  "node_modules/.pnpm/ansi-colors@4.1.3/node_modules/ansi-colors/index.js"(exports2, module2) {
    "use strict";
    var isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
    var ANSI_REGEX = /[\u001b\u009b][[\]#;?()]*(?:(?:(?:[^\W_]*;?[^\W_]*)\u0007)|(?:(?:[0-9]{1,4}(;[0-9]{0,4})*)?[~0-9=<>cf-nqrtyA-PRZ]))/g;
    var hasColor = () => {
      if (typeof process !== "undefined") {
        return process.env.FORCE_COLOR !== "0";
      }
      return false;
    };
    var create = () => {
      const colors = {
        enabled: hasColor(),
        visible: true,
        styles: {},
        keys: {}
      };
      const ansi = (style2) => {
        let open = style2.open = `\x1B[${style2.codes[0]}m`;
        let close = style2.close = `\x1B[${style2.codes[1]}m`;
        let regex2 = style2.regex = new RegExp(`\\u001b\\[${style2.codes[1]}m`, "g");
        style2.wrap = (input2, newline) => {
          if (input2.includes(close)) input2 = input2.replace(regex2, close + open);
          let output2 = open + input2 + close;
          return newline ? output2.replace(/\r*\n/g, `${close}$&${open}`) : output2;
        };
        return style2;
      };
      const wrap = (style2, input2, newline) => {
        return typeof style2 === "function" ? style2(input2) : style2.wrap(input2, newline);
      };
      const style = (input2, stack) => {
        if (input2 === "" || input2 == null) return "";
        if (colors.enabled === false) return input2;
        if (colors.visible === false) return "";
        let str = "" + input2;
        let nl = str.includes("\n");
        let n = stack.length;
        if (n > 0 && stack.includes("unstyle")) {
          stack = [.../* @__PURE__ */ new Set(["unstyle", ...stack])].reverse();
        }
        while (n-- > 0) str = wrap(colors.styles[stack[n]], str, nl);
        return str;
      };
      const define = (name, codes, type) => {
        colors.styles[name] = ansi({ name, codes });
        let keys = colors.keys[type] || (colors.keys[type] = []);
        keys.push(name);
        Reflect.defineProperty(colors, name, {
          configurable: true,
          enumerable: true,
          set(value) {
            colors.alias(name, value);
          },
          get() {
            let color = (input2) => style(input2, color.stack);
            Reflect.setPrototypeOf(color, colors);
            color.stack = this.stack ? this.stack.concat(name) : [name];
            return color;
          }
        });
      };
      define("reset", [0, 0], "modifier");
      define("bold", [1, 22], "modifier");
      define("dim", [2, 22], "modifier");
      define("italic", [3, 23], "modifier");
      define("underline", [4, 24], "modifier");
      define("inverse", [7, 27], "modifier");
      define("hidden", [8, 28], "modifier");
      define("strikethrough", [9, 29], "modifier");
      define("black", [30, 39], "color");
      define("red", [31, 39], "color");
      define("green", [32, 39], "color");
      define("yellow", [33, 39], "color");
      define("blue", [34, 39], "color");
      define("magenta", [35, 39], "color");
      define("cyan", [36, 39], "color");
      define("white", [37, 39], "color");
      define("gray", [90, 39], "color");
      define("grey", [90, 39], "color");
      define("bgBlack", [40, 49], "bg");
      define("bgRed", [41, 49], "bg");
      define("bgGreen", [42, 49], "bg");
      define("bgYellow", [43, 49], "bg");
      define("bgBlue", [44, 49], "bg");
      define("bgMagenta", [45, 49], "bg");
      define("bgCyan", [46, 49], "bg");
      define("bgWhite", [47, 49], "bg");
      define("blackBright", [90, 39], "bright");
      define("redBright", [91, 39], "bright");
      define("greenBright", [92, 39], "bright");
      define("yellowBright", [93, 39], "bright");
      define("blueBright", [94, 39], "bright");
      define("magentaBright", [95, 39], "bright");
      define("cyanBright", [96, 39], "bright");
      define("whiteBright", [97, 39], "bright");
      define("bgBlackBright", [100, 49], "bgBright");
      define("bgRedBright", [101, 49], "bgBright");
      define("bgGreenBright", [102, 49], "bgBright");
      define("bgYellowBright", [103, 49], "bgBright");
      define("bgBlueBright", [104, 49], "bgBright");
      define("bgMagentaBright", [105, 49], "bgBright");
      define("bgCyanBright", [106, 49], "bgBright");
      define("bgWhiteBright", [107, 49], "bgBright");
      colors.ansiRegex = ANSI_REGEX;
      colors.hasColor = colors.hasAnsi = (str) => {
        colors.ansiRegex.lastIndex = 0;
        return typeof str === "string" && str !== "" && colors.ansiRegex.test(str);
      };
      colors.alias = (name, color) => {
        let fn = typeof color === "string" ? colors[color] : color;
        if (typeof fn !== "function") {
          throw new TypeError("Expected alias to be the name of an existing color (string) or a function");
        }
        if (!fn.stack) {
          Reflect.defineProperty(fn, "name", { value: name });
          colors.styles[name] = fn;
          fn.stack = [name];
        }
        Reflect.defineProperty(colors, name, {
          configurable: true,
          enumerable: true,
          set(value) {
            colors.alias(name, value);
          },
          get() {
            let color2 = (input2) => style(input2, color2.stack);
            Reflect.setPrototypeOf(color2, colors);
            color2.stack = this.stack ? this.stack.concat(fn.stack) : fn.stack;
            return color2;
          }
        });
      };
      colors.theme = (custom) => {
        if (!isObject(custom)) throw new TypeError("Expected theme to be an object");
        for (let name of Object.keys(custom)) {
          colors.alias(name, custom[name]);
        }
        return colors;
      };
      colors.alias("unstyle", (str) => {
        if (typeof str === "string" && str !== "") {
          colors.ansiRegex.lastIndex = 0;
          return str.replace(colors.ansiRegex, "");
        }
        return "";
      });
      colors.alias("noop", (str) => str);
      colors.none = colors.clear = colors.noop;
      colors.stripColor = colors.unstyle;
      colors.symbols = require_symbols();
      colors.define = define;
      return colors;
    };
    module2.exports = create();
    module2.exports.create = create;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/utils.js
var require_utils = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/utils.js"(exports2) {
    "use strict";
    var toString = Object.prototype.toString;
    var colors = require_ansi_colors();
    var onExitCalled = false;
    var onExitCallbacks = /* @__PURE__ */ new Set();
    var complements = {
      "yellow": "blue",
      "cyan": "red",
      "green": "magenta",
      "black": "white",
      "blue": "yellow",
      "red": "cyan",
      "magenta": "green",
      "white": "black"
    };
    exports2.longest = (arr, prop) => {
      return arr.reduce((a, v) => Math.max(a, prop ? v[prop].length : v.length), 0);
    };
    exports2.hasColor = (str) => !!str && colors.hasColor(str);
    var isObject = exports2.isObject = (val) => {
      return val !== null && typeof val === "object" && !Array.isArray(val);
    };
    exports2.nativeType = (val) => {
      return toString.call(val).slice(8, -1).toLowerCase().replace(/\s/g, "");
    };
    exports2.isAsyncFn = (val) => {
      return exports2.nativeType(val) === "asyncfunction";
    };
    exports2.isPrimitive = (val) => {
      return val != null && typeof val !== "object" && typeof val !== "function";
    };
    exports2.resolve = (context, value, ...rest) => {
      if (typeof value === "function") {
        return value.call(context, ...rest);
      }
      return value;
    };
    exports2.scrollDown = (choices = []) => [...choices.slice(1), choices[0]];
    exports2.scrollUp = (choices = []) => [choices.pop(), ...choices];
    exports2.reorder = (arr = []) => {
      let res = arr.slice();
      res.sort((a, b) => {
        if (a.index > b.index) return 1;
        if (a.index < b.index) return -1;
        return 0;
      });
      return res;
    };
    exports2.swap = (arr, index, pos) => {
      let len = arr.length;
      let idx = pos === len ? 0 : pos < 0 ? len - 1 : pos;
      let choice = arr[index];
      arr[index] = arr[idx];
      arr[idx] = choice;
    };
    exports2.width = (stream, fallback = 80) => {
      let columns = stream && stream.columns ? stream.columns : fallback;
      if (stream && typeof stream.getWindowSize === "function") {
        columns = stream.getWindowSize()[0];
      }
      if (process.platform === "win32") {
        return columns - 1;
      }
      return columns;
    };
    exports2.height = (stream, fallback = 20) => {
      let rows = stream && stream.rows ? stream.rows : fallback;
      if (stream && typeof stream.getWindowSize === "function") {
        rows = stream.getWindowSize()[1];
      }
      return rows;
    };
    exports2.wordWrap = (str, options = {}) => {
      if (!str) return str;
      if (typeof options === "number") {
        options = { width: options };
      }
      let { indent = "", newline = "\n" + indent, width = 80 } = options;
      let spaces = (newline + indent).match(/[^\S\n]/g) || [];
      width -= spaces.length;
      let source = `.{1,${width}}([\\s\\u200B]+|$)|[^\\s\\u200B]+?([\\s\\u200B]+|$)`;
      let output2 = str.trim();
      let regex2 = new RegExp(source, "g");
      let lines = output2.match(regex2) || [];
      lines = lines.map((line) => line.replace(/\n$/, ""));
      if (options.padEnd) lines = lines.map((line) => line.padEnd(width, " "));
      if (options.padStart) lines = lines.map((line) => line.padStart(width, " "));
      return indent + lines.join(newline);
    };
    exports2.unmute = (color) => {
      let name = color.stack.find((n) => colors.keys.color.includes(n));
      if (name) {
        return colors[name];
      }
      let bg = color.stack.find((n) => n.slice(2) === "bg");
      if (bg) {
        return colors[name.slice(2)];
      }
      return (str) => str;
    };
    exports2.pascal = (str) => str ? str[0].toUpperCase() + str.slice(1) : "";
    exports2.inverse = (color) => {
      if (!color || !color.stack) return color;
      let name = color.stack.find((n) => colors.keys.color.includes(n));
      if (name) {
        let col = colors["bg" + exports2.pascal(name)];
        return col ? col.black : color;
      }
      let bg = color.stack.find((n) => n.slice(0, 2) === "bg");
      if (bg) {
        return colors[bg.slice(2).toLowerCase()] || color;
      }
      return colors.none;
    };
    exports2.complement = (color) => {
      if (!color || !color.stack) return color;
      let name = color.stack.find((n) => colors.keys.color.includes(n));
      let bg = color.stack.find((n) => n.slice(0, 2) === "bg");
      if (name && !bg) {
        return colors[complements[name] || name];
      }
      if (bg) {
        let lower = bg.slice(2).toLowerCase();
        let comp = complements[lower];
        if (!comp) return color;
        return colors["bg" + exports2.pascal(comp)] || color;
      }
      return colors.none;
    };
    exports2.meridiem = (date) => {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      let hrs = hours === 0 ? 12 : hours;
      let min = minutes < 10 ? "0" + minutes : minutes;
      return hrs + ":" + min + " " + ampm;
    };
    exports2.set = (obj = {}, prop = "", val) => {
      return prop.split(".").reduce((acc, k, i, arr) => {
        let value = arr.length - 1 > i ? acc[k] || {} : val;
        if (!exports2.isObject(value) && i < arr.length - 1) value = {};
        return acc[k] = value;
      }, obj);
    };
    exports2.get = (obj = {}, prop = "", fallback) => {
      let value = obj[prop] == null ? prop.split(".").reduce((acc, k) => acc && acc[k], obj) : obj[prop];
      return value == null ? fallback : value;
    };
    exports2.mixin = (target, b) => {
      if (!isObject(target)) return b;
      if (!isObject(b)) return target;
      for (let key of Object.keys(b)) {
        let desc = Object.getOwnPropertyDescriptor(b, key);
        if (hasOwnProperty.call(desc, "value")) {
          if (hasOwnProperty.call(target, key) && isObject(desc.value)) {
            let existing = Object.getOwnPropertyDescriptor(target, key);
            if (isObject(existing.value) && existing.value !== desc.value) {
              target[key] = exports2.merge({}, target[key], b[key]);
            } else {
              Reflect.defineProperty(target, key, desc);
            }
          } else {
            Reflect.defineProperty(target, key, desc);
          }
        } else {
          Reflect.defineProperty(target, key, desc);
        }
      }
      return target;
    };
    exports2.merge = (...args) => {
      let target = {};
      for (let ele of args) exports2.mixin(target, ele);
      return target;
    };
    exports2.mixinEmitter = (obj, emitter) => {
      let proto2 = emitter.constructor.prototype;
      for (let key of Object.keys(proto2)) {
        let val = proto2[key];
        if (typeof val === "function") {
          exports2.define(obj, key, val.bind(emitter));
        } else {
          exports2.define(obj, key, val);
        }
      }
    };
    var onExit2 = (quit, code) => {
      if (onExitCalled) return;
      onExitCalled = true;
      onExitCallbacks.forEach((fn) => fn());
      if (quit === true) {
        process.exit(128 + code);
      }
    };
    var onSigTerm = onExit2.bind(null, true, 15);
    var onSigInt = onExit2.bind(null, true, 2);
    exports2.onExit = (callback) => {
      if (onExitCallbacks.size === 0) {
        process.once("SIGTERM", onSigTerm);
        process.once("SIGINT", onSigInt);
        process.once("exit", onExit2);
      }
      onExitCallbacks.add(callback);
      return () => {
        onExitCallbacks.delete(callback);
        if (onExitCallbacks.size === 0) {
          process.off("SIGTERM", onSigTerm);
          process.off("SIGINT", onSigInt);
          process.off("exit", onExit2);
        }
      };
    };
    exports2.define = (obj, key, value) => {
      Reflect.defineProperty(obj, key, { value });
    };
    exports2.defineExport = (obj, key, fn) => {
      let custom;
      Reflect.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        set(val) {
          custom = val;
        },
        get() {
          return custom ? custom() : fn();
        }
      });
    };
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/combos.js
var require_combos = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/combos.js"(exports2) {
    "use strict";
    exports2.ctrl = {
      a: "first",
      b: "backward",
      c: "cancel",
      d: "deleteForward",
      e: "last",
      f: "forward",
      g: "reset",
      i: "tab",
      k: "cutForward",
      l: "reset",
      n: "newItem",
      m: "cancel",
      j: "submit",
      p: "search",
      r: "remove",
      s: "save",
      u: "undo",
      w: "cutLeft",
      x: "toggleCursor",
      v: "paste"
    };
    exports2.shift = {
      up: "shiftUp",
      down: "shiftDown",
      left: "shiftLeft",
      right: "shiftRight",
      tab: "prev"
    };
    exports2.fn = {
      up: "pageUp",
      down: "pageDown",
      left: "pageLeft",
      right: "pageRight",
      delete: "deleteForward"
    };
    exports2.option = {
      b: "backward",
      f: "forward",
      d: "cutRight",
      left: "cutLeft",
      up: "altUp",
      down: "altDown"
    };
    exports2.keys = {
      pageup: "pageUp",
      // <fn>+<up> (mac), <Page Up> (windows)
      pagedown: "pageDown",
      // <fn>+<down> (mac), <Page Down> (windows)
      home: "home",
      // <fn>+<left> (mac), <home> (windows)
      end: "end",
      // <fn>+<right> (mac), <end> (windows)
      cancel: "cancel",
      delete: "deleteForward",
      backspace: "delete",
      down: "down",
      enter: "submit",
      escape: "cancel",
      left: "left",
      space: "space",
      number: "number",
      return: "submit",
      right: "right",
      tab: "next",
      up: "up"
    };
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/queue.js
var require_queue = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/queue.js"(exports2, module2) {
    "use strict";
    module2.exports = class Queue {
      _queue = [];
      _executing = false;
      _jobRunner = null;
      constructor(jobRunner) {
        this._jobRunner = jobRunner;
      }
      enqueue = (...args) => {
        this._queue.push(args);
        this._dequeue();
      };
      destroy() {
        this._queue.length = 0;
        this._jobRunner = null;
      }
      _dequeue() {
        if (this._executing || !this._queue.length) return;
        this._executing = true;
        this._jobRunner(...this._queue.shift());
        setTimeout(() => {
          this._executing = false;
          this._dequeue();
        });
      }
    };
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/keypress.js
var require_keypress = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/keypress.js"(exports2, module2) {
    "use strict";
    var readline2 = require("readline");
    var combos = require_combos();
    var Queue = require_queue();
    var metaKeyCodeRe = /^(?:\x1b)([a-zA-Z0-9])$/;
    var fnKeyRe = /^(?:\x1b+)(O|N|\[|\[\[)(?:(\d+)(?:;(\d+))?([~^$])|(?:1;)?(\d+)?([a-zA-Z]))/;
    var keyName = {
      /* xterm/gnome ESC O letter */
      "OP": "f1",
      "OQ": "f2",
      "OR": "f3",
      "OS": "f4",
      /* xterm/rxvt ESC [ number ~ */
      "[11~": "f1",
      "[12~": "f2",
      "[13~": "f3",
      "[14~": "f4",
      /* from Cygwin and used in libuv */
      "[[A": "f1",
      "[[B": "f2",
      "[[C": "f3",
      "[[D": "f4",
      "[[E": "f5",
      /* common */
      "[15~": "f5",
      "[17~": "f6",
      "[18~": "f7",
      "[19~": "f8",
      "[20~": "f9",
      "[21~": "f10",
      "[23~": "f11",
      "[24~": "f12",
      /* xterm ESC [ letter */
      "[A": "up",
      "[B": "down",
      "[C": "right",
      "[D": "left",
      "[E": "clear",
      "[F": "end",
      "[H": "home",
      /* xterm/gnome ESC O letter */
      "OA": "up",
      "OB": "down",
      "OC": "right",
      "OD": "left",
      "OE": "clear",
      "OF": "end",
      "OH": "home",
      /* xterm/rxvt ESC [ number ~ */
      "[1~": "home",
      "[2~": "insert",
      "[3~": "delete",
      "[4~": "end",
      "[5~": "pageup",
      "[6~": "pagedown",
      /* putty */
      "[[5~": "pageup",
      "[[6~": "pagedown",
      /* rxvt */
      "[7~": "home",
      "[8~": "end",
      /* rxvt keys with modifiers */
      "[a": "up",
      "[b": "down",
      "[c": "right",
      "[d": "left",
      "[e": "clear",
      "[2$": "insert",
      "[3$": "delete",
      "[5$": "pageup",
      "[6$": "pagedown",
      "[7$": "home",
      "[8$": "end",
      "Oa": "up",
      "Ob": "down",
      "Oc": "right",
      "Od": "left",
      "Oe": "clear",
      "[2^": "insert",
      "[3^": "delete",
      "[5^": "pageup",
      "[6^": "pagedown",
      "[7^": "home",
      "[8^": "end",
      /* misc. */
      "[Z": "tab"
    };
    function isShiftKey(code) {
      return ["[a", "[b", "[c", "[d", "[e", "[2$", "[3$", "[5$", "[6$", "[7$", "[8$", "[Z"].includes(code);
    }
    function isCtrlKey(code) {
      return ["Oa", "Ob", "Oc", "Od", "Oe", "[2^", "[3^", "[5^", "[6^", "[7^", "[8^"].includes(code);
    }
    var keypress = (s = "", event = {}) => {
      let parts;
      let key = {
        name: event.name,
        ctrl: false,
        meta: false,
        shift: false,
        option: false,
        sequence: s,
        raw: s,
        ...event
      };
      if (Buffer.isBuffer(s)) {
        if (s[0] > 127 && s[1] === void 0) {
          s[0] -= 128;
          s = "\x1B" + String(s);
        } else {
          s = String(s);
        }
      } else if (s !== void 0 && typeof s !== "string") {
        s = String(s);
      } else if (!s) {
        s = key.sequence || "";
      }
      key.sequence = key.sequence || s || key.name;
      if (s === "\r") {
        key.raw = void 0;
        key.name = "return";
      } else if (s === "\n") {
        key.name = "enter";
      } else if (s === "	") {
        key.name = "tab";
      } else if (s === "\b" || s === "\x7F" || s === "\x1B\x7F" || s === "\x1B\b") {
        key.name = "backspace";
        key.meta = s.charAt(0) === "\x1B";
      } else if (s === "\x1B" || s === "\x1B\x1B") {
        key.name = "escape";
        key.meta = s.length === 2;
      } else if (s === " " || s === "\x1B ") {
        key.name = "space";
        key.meta = s.length === 2;
      } else if (s <= "") {
        key.name = String.fromCharCode(s.charCodeAt(0) + "a".charCodeAt(0) - 1);
        key.ctrl = true;
      } else if (s.length === 1 && s >= "0" && s <= "9") {
        key.name = "number";
      } else if (s.length === 1 && s >= "a" && s <= "z") {
        key.name = s;
      } else if (s.length === 1 && s >= "A" && s <= "Z") {
        key.name = s.toLowerCase();
        key.shift = true;
      } else if (parts = metaKeyCodeRe.exec(s)) {
        key.meta = true;
        key.shift = /^[A-Z]$/.test(parts[1]);
      } else if (parts = fnKeyRe.exec(s)) {
        let segs = [...s];
        if (segs[0] === "\x1B" && segs[1] === "\x1B") {
          key.option = true;
        }
        let code = [parts[1], parts[2], parts[4], parts[6]].filter(Boolean).join("");
        let modifier = (parts[3] || parts[5] || 1) - 1;
        key.ctrl = !!(modifier & 4);
        key.meta = !!(modifier & 10);
        key.shift = !!(modifier & 1);
        key.code = code;
        key.name = keyName[code];
        key.shift = isShiftKey(code) || key.shift;
        key.ctrl = isCtrlKey(code) || key.ctrl;
      }
      return key;
    };
    keypress.listen = (options = {}, onKeypress) => {
      let { stdin } = options;
      if (!stdin || stdin !== process.stdin && !stdin.isTTY) {
        throw new Error("Invalid stream passed");
      }
      let rl = readline2.createInterface({ terminal: true, input: stdin });
      readline2.emitKeypressEvents(stdin, rl);
      const queue = new Queue((buf, key) => onKeypress(buf, keypress(buf, key), rl));
      let isRaw = stdin.isRaw;
      if (stdin.isTTY) stdin.setRawMode(true);
      stdin.on("keypress", queue.enqueue);
      rl.resume();
      let off = () => {
        if (stdin.isTTY) stdin.setRawMode(isRaw);
        stdin.removeListener("keypress", queue.enqueue);
        queue.destroy();
        rl.pause();
        rl.close();
      };
      return off;
    };
    keypress.action = (buf, key, customActions) => {
      let obj = { ...combos, ...customActions };
      if (key.ctrl) {
        key.action = obj.ctrl[key.name];
        return key;
      }
      if (key.option && obj.option) {
        key.action = obj.option[key.name];
        return key;
      }
      if (key.shift) {
        key.action = obj.shift[key.name];
        return key;
      }
      key.action = obj.keys[key.name];
      return key;
    };
    module2.exports = keypress;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/timer.js
var require_timer = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/timer.js"(exports2, module2) {
    "use strict";
    module2.exports = (prompt) => {
      prompt.timers = prompt.timers || {};
      let timers = prompt.options.timers;
      if (!timers) return;
      for (let key of Object.keys(timers)) {
        let opts = timers[key];
        if (typeof opts === "number") {
          opts = { interval: opts };
        }
        create(prompt, key, opts);
      }
    };
    function create(prompt, name, options = {}) {
      let timer = prompt.timers[name] = { name, start: Date.now(), ms: 0, tick: 0 };
      let ms = options.interval || 120;
      timer.frames = options.frames || [];
      timer.loading = true;
      let interval = setInterval(() => {
        timer.ms = Date.now() - timer.start;
        timer.tick++;
        prompt.render();
      }, ms);
      timer.stop = () => {
        timer.loading = false;
        clearInterval(interval);
      };
      Reflect.defineProperty(timer, "interval", { value: interval });
      prompt.once("close", () => timer.stop());
      return timer.stop;
    }
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/state.js
var require_state = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/state.js"(exports2, module2) {
    "use strict";
    var { define, width } = require_utils();
    var State = class {
      constructor(prompt) {
        let options = prompt.options;
        define(this, "_prompt", prompt);
        this.type = prompt.type;
        this.name = prompt.name;
        this.message = "";
        this.header = "";
        this.footer = "";
        this.error = "";
        this.hint = "";
        this.input = "";
        this.cursor = 0;
        this.index = 0;
        this.lines = 0;
        this.tick = 0;
        this.prompt = "";
        this.buffer = "";
        this.width = width(options.stdout || process.stdout);
        Object.assign(this, options);
        this.name = this.name || this.message;
        this.message = this.message || this.name;
        this.symbols = prompt.symbols;
        this.styles = prompt.styles;
        this.required = /* @__PURE__ */ new Set();
        this.cancelled = false;
        this.submitted = false;
      }
      clone() {
        let state = { ...this };
        state.status = this.status;
        state.buffer = Buffer.from(state.buffer);
        delete state.clone;
        return state;
      }
      set color(val) {
        this._color = val;
      }
      get color() {
        let styles4 = this.prompt.styles;
        if (this.cancelled) return styles4.cancelled;
        if (this.submitted) return styles4.submitted;
        let color = this._color || styles4[this.status];
        return typeof color === "function" ? color : styles4.pending;
      }
      set loading(value) {
        this._loading = value;
      }
      get loading() {
        if (typeof this._loading === "boolean") return this._loading;
        if (this.loadingChoices) return "choices";
        return false;
      }
      get status() {
        if (this.cancelled) return "cancelled";
        if (this.submitted) return "submitted";
        return "pending";
      }
    };
    module2.exports = State;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/styles.js
var require_styles = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/styles.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    var colors = require_ansi_colors();
    var styles4 = {
      default: colors.noop,
      noop: colors.noop,
      /**
       * Modifiers
       */
      set inverse(custom) {
        this._inverse = custom;
      },
      get inverse() {
        return this._inverse || utils.inverse(this.primary);
      },
      set complement(custom) {
        this._complement = custom;
      },
      get complement() {
        return this._complement || utils.complement(this.primary);
      },
      /**
       * Main color
       */
      primary: colors.cyan,
      /**
       * Main palette
       */
      success: colors.green,
      danger: colors.magenta,
      strong: colors.bold,
      warning: colors.yellow,
      muted: colors.dim,
      disabled: colors.gray,
      dark: colors.dim.gray,
      underline: colors.underline,
      set info(custom) {
        this._info = custom;
      },
      get info() {
        return this._info || this.primary;
      },
      set em(custom) {
        this._em = custom;
      },
      get em() {
        return this._em || this.primary.underline;
      },
      set heading(custom) {
        this._heading = custom;
      },
      get heading() {
        return this._heading || this.muted.underline;
      },
      /**
       * Statuses
       */
      set pending(custom) {
        this._pending = custom;
      },
      get pending() {
        return this._pending || this.primary;
      },
      set submitted(custom) {
        this._submitted = custom;
      },
      get submitted() {
        return this._submitted || this.success;
      },
      set cancelled(custom) {
        this._cancelled = custom;
      },
      get cancelled() {
        return this._cancelled || this.danger;
      },
      /**
       * Special styling
       */
      set typing(custom) {
        this._typing = custom;
      },
      get typing() {
        return this._typing || this.dim;
      },
      set placeholder(custom) {
        this._placeholder = custom;
      },
      get placeholder() {
        return this._placeholder || this.primary.dim;
      },
      set highlight(custom) {
        this._highlight = custom;
      },
      get highlight() {
        return this._highlight || this.inverse;
      }
    };
    styles4.merge = (options = {}) => {
      if (options.styles && typeof options.styles.enabled === "boolean") {
        colors.enabled = options.styles.enabled;
      }
      if (options.styles && typeof options.styles.visible === "boolean") {
        colors.visible = options.styles.visible;
      }
      let result = utils.merge({}, styles4, options.styles);
      delete result.merge;
      for (let key of Object.keys(colors)) {
        if (!hasOwnProperty.call(result, key)) {
          Reflect.defineProperty(result, key, { get: () => colors[key] });
        }
      }
      for (let key of Object.keys(colors.styles)) {
        if (!hasOwnProperty.call(result, key)) {
          Reflect.defineProperty(result, key, { get: () => colors[key] });
        }
      }
      return result;
    };
    module2.exports = styles4;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/symbols.js
var require_symbols2 = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/symbols.js"(exports2, module2) {
    "use strict";
    var isWindows = process.platform === "win32";
    var colors = require_ansi_colors();
    var utils = require_utils();
    var symbols = {
      ...colors.symbols,
      upDownDoubleArrow: "\u21D5",
      upDownDoubleArrow2: "\u2B0D",
      upDownArrow: "\u2195",
      asterisk: "*",
      asterism: "\u2042",
      bulletWhite: "\u25E6",
      electricArrow: "\u2301",
      ellipsisLarge: "\u22EF",
      ellipsisSmall: "\u2026",
      fullBlock: "\u2588",
      identicalTo: "\u2261",
      indicator: colors.symbols.check,
      leftAngle: "\u2039",
      mark: "\u203B",
      minus: "\u2212",
      multiplication: "\xD7",
      obelus: "\xF7",
      percent: "%",
      pilcrow: "\xB6",
      pilcrow2: "\u2761",
      pencilUpRight: "\u2710",
      pencilDownRight: "\u270E",
      pencilRight: "\u270F",
      plus: "+",
      plusMinus: "\xB1",
      pointRight: "\u261E",
      rightAngle: "\u203A",
      section: "\xA7",
      hexagon: { off: "\u2B21", on: "\u2B22", disabled: "\u2B22" },
      ballot: { on: "\u2611", off: "\u2610", disabled: "\u2612" },
      stars: { on: "\u2605", off: "\u2606", disabled: "\u2606" },
      folder: { on: "\u25BC", off: "\u25B6", disabled: "\u25B6" },
      prefix: {
        pending: colors.symbols.question,
        submitted: colors.symbols.check,
        cancelled: colors.symbols.cross
      },
      separator: {
        pending: colors.symbols.pointerSmall,
        submitted: colors.symbols.middot,
        cancelled: colors.symbols.middot
      },
      radio: {
        off: isWindows ? "( )" : "\u25EF",
        on: isWindows ? "(*)" : "\u25C9",
        disabled: isWindows ? "(|)" : "\u24BE"
      },
      numbers: ["\u24EA", "\u2460", "\u2461", "\u2462", "\u2463", "\u2464", "\u2465", "\u2466", "\u2467", "\u2468", "\u2469", "\u246A", "\u246B", "\u246C", "\u246D", "\u246E", "\u246F", "\u2470", "\u2471", "\u2472", "\u2473", "\u3251", "\u3252", "\u3253", "\u3254", "\u3255", "\u3256", "\u3257", "\u3258", "\u3259", "\u325A", "\u325B", "\u325C", "\u325D", "\u325E", "\u325F", "\u32B1", "\u32B2", "\u32B3", "\u32B4", "\u32B5", "\u32B6", "\u32B7", "\u32B8", "\u32B9", "\u32BA", "\u32BB", "\u32BC", "\u32BD", "\u32BE", "\u32BF"]
    };
    symbols.merge = (options) => {
      let result = utils.merge({}, colors.symbols, symbols, options.symbols);
      delete result.merge;
      return result;
    };
    module2.exports = symbols;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/theme.js
var require_theme = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/theme.js"(exports2, module2) {
    "use strict";
    var styles4 = require_styles();
    var symbols = require_symbols2();
    var utils = require_utils();
    module2.exports = (prompt) => {
      prompt.options = utils.merge({}, prompt.options.theme, prompt.options);
      prompt.symbols = symbols.merge(prompt.options);
      prompt.styles = styles4.merge(prompt.options);
    };
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/ansi.js
var require_ansi = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/ansi.js"(exports2, module2) {
    "use strict";
    var isTerm = process.env.TERM_PROGRAM === "Apple_Terminal";
    var stripAnsi2 = require_strip_ansi();
    var utils = require_utils();
    var ansi = module2.exports = exports2;
    var ESC = "\x1B[";
    var BEL = "\x07";
    var hidden2 = false;
    var code = ansi.code = {
      bell: BEL,
      beep: BEL,
      beginning: `${ESC}G`,
      down: `${ESC}J`,
      esc: ESC,
      getPosition: `${ESC}6n`,
      hide: `${ESC}?25l`,
      line: `${ESC}2K`,
      lineEnd: `${ESC}K`,
      lineStart: `${ESC}1K`,
      restorePosition: ESC + (isTerm ? "8" : "u"),
      savePosition: ESC + (isTerm ? "7" : "s"),
      screen: `${ESC}2J`,
      show: `${ESC}?25h`,
      up: `${ESC}1J`
    };
    var cursor = ansi.cursor = {
      get hidden() {
        return hidden2;
      },
      hide() {
        hidden2 = true;
        return code.hide;
      },
      show() {
        hidden2 = false;
        return code.show;
      },
      forward: (count = 1) => `${ESC}${count}C`,
      backward: (count = 1) => `${ESC}${count}D`,
      nextLine: (count = 1) => `${ESC}E`.repeat(count),
      prevLine: (count = 1) => `${ESC}F`.repeat(count),
      up: (count = 1) => count ? `${ESC}${count}A` : "",
      down: (count = 1) => count ? `${ESC}${count}B` : "",
      right: (count = 1) => count ? `${ESC}${count}C` : "",
      left: (count = 1) => count ? `${ESC}${count}D` : "",
      to(x, y) {
        return y ? `${ESC}${y + 1};${x + 1}H` : `${ESC}${x + 1}G`;
      },
      move(x = 0, y = 0) {
        let res = "";
        res += x < 0 ? cursor.left(-x) : x > 0 ? cursor.right(x) : "";
        res += y < 0 ? cursor.up(-y) : y > 0 ? cursor.down(y) : "";
        return res;
      },
      strLen(str) {
        var realLength = 0, len = str.length, charCode = -1;
        for (var i = 0; i < len; i++) {
          charCode = str.charCodeAt(i);
          if (charCode >= 0 && charCode <= 128) realLength += 1;
          else realLength += 2;
        }
        return realLength;
      },
      restore(state = {}) {
        let { after, cursor: cursor2, initial, input: input2, prompt, size, value } = state;
        initial = utils.isPrimitive(initial) ? String(initial) : "";
        input2 = utils.isPrimitive(input2) ? String(input2) : "";
        value = utils.isPrimitive(value) ? String(value) : "";
        if (size) {
          let codes = ansi.cursor.up(size) + ansi.cursor.to(this.strLen(prompt));
          let diff = input2.length - cursor2;
          if (diff > 0) {
            codes += ansi.cursor.left(diff);
          }
          return codes;
        }
        if (value || after) {
          let pos = !input2 && !!initial ? -this.strLen(initial) : -this.strLen(input2) + cursor2;
          if (after) pos -= this.strLen(after);
          if (input2 === "" && initial && !prompt.includes(initial)) {
            pos += this.strLen(initial);
          }
          return ansi.cursor.move(pos);
        }
      }
    };
    var erase = ansi.erase = {
      screen: code.screen,
      up: code.up,
      down: code.down,
      line: code.line,
      lineEnd: code.lineEnd,
      lineStart: code.lineStart,
      lines(n) {
        let str = "";
        for (let i = 0; i < n; i++) {
          str += ansi.erase.line + (i < n - 1 ? ansi.cursor.up(1) : "");
        }
        if (n) str += ansi.code.beginning;
        return str;
      }
    };
    ansi.clear = (input2 = "", columns = process.stdout.columns) => {
      if (!columns) return erase.line + cursor.to(0);
      let width = (str) => [...stripAnsi2(str)].length;
      let lines = input2.split(/\r?\n/);
      let rows = 0;
      for (let line of lines) {
        rows += 1 + Math.floor(Math.max(width(line) - 1, 0) / columns);
      }
      return (erase.line + cursor.prevLine()).repeat(rows - 1) + erase.line + cursor.to(0);
    };
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompt.js
var require_prompt = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompt.js"(exports2, module2) {
    "use strict";
    var Events = require("events");
    var stripAnsi2 = require_strip_ansi();
    var keypress = require_keypress();
    var timer = require_timer();
    var State = require_state();
    var theme = require_theme();
    var utils = require_utils();
    var ansi = require_ansi();
    var Prompt = class _Prompt extends Events {
      constructor(options = {}) {
        super();
        this.name = options.name;
        this.type = options.type;
        this.options = options;
        theme(this);
        timer(this);
        this.state = new State(this);
        this.initial = [options.initial, options.default].find((v) => v != null);
        this.stdout = options.stdout || process.stdout;
        this.stdin = options.stdin || process.stdin;
        this.scale = options.scale || 1;
        this.term = this.options.term || process.env.TERM_PROGRAM;
        this.margin = margin(this.options.margin);
        this.setMaxListeners(0);
        setOptions(this);
      }
      async keypress(input2, event = {}) {
        this.keypressed = true;
        let key = keypress.action(input2, keypress(input2, event), this.options.actions);
        this.state.keypress = key;
        this.emit("keypress", input2, key);
        this.emit("state", this.state.clone());
        const fn = this.options[key.action] || this[key.action] || this.dispatch;
        if (typeof fn === "function") {
          return await fn.call(this, input2, key);
        }
        this.alert();
      }
      alert() {
        delete this.state.alert;
        if (this.options.show === false) {
          this.emit("alert");
        } else {
          this.stdout.write(ansi.code.beep);
        }
      }
      cursorHide() {
        this.stdout.write(ansi.cursor.hide());
        const releaseOnExit = utils.onExit(() => this.cursorShow());
        this.on("close", () => {
          this.cursorShow();
          releaseOnExit();
        });
      }
      cursorShow() {
        this.stdout.write(ansi.cursor.show());
      }
      write(str) {
        if (!str) return;
        if (this.stdout && this.state.show !== false) {
          this.stdout.write(str);
        }
        this.state.buffer += str;
      }
      clear(lines = 0) {
        let buffer = this.state.buffer;
        this.state.buffer = "";
        if (!buffer && !lines || this.options.show === false) return;
        this.stdout.write(ansi.cursor.down(lines) + ansi.clear(buffer, this.width));
      }
      restore() {
        if (this.state.closed || this.options.show === false) return;
        let { prompt, after, rest } = this.sections();
        let { cursor, initial = "", input: input2 = "", value = "" } = this;
        let size = this.state.size = rest.length;
        let state = { after, cursor, initial, input: input2, prompt, size, value };
        let codes = ansi.cursor.restore(state);
        if (codes) {
          this.stdout.write(codes);
        }
      }
      sections() {
        let { buffer, input: input2, prompt } = this.state;
        prompt = stripAnsi2(prompt);
        let buf = stripAnsi2(buffer);
        let idx = buf.indexOf(prompt);
        let header = buf.slice(0, idx);
        let rest = buf.slice(idx);
        let lines = rest.split("\n");
        let first = lines[0];
        let last = lines[lines.length - 1];
        let promptLine = prompt + (input2 ? " " + input2 : "");
        let len = promptLine.length;
        let after = len < first.length ? first.slice(len + 1) : "";
        return { header, prompt: first, after, rest: lines.slice(1), last };
      }
      async submit() {
        this.state.submitted = true;
        this.state.validating = true;
        if (this.options.onSubmit) {
          await this.options.onSubmit.call(this, this.name, this.value, this);
        }
        let result = this.state.error || await this.validate(this.value, this.state);
        if (result !== true) {
          let error3 = "\n" + this.symbols.pointer + " ";
          if (typeof result === "string") {
            error3 += result.trim();
          } else {
            error3 += "Invalid input";
          }
          this.state.error = "\n" + this.styles.danger(error3);
          this.state.submitted = false;
          await this.render();
          await this.alert();
          this.state.validating = false;
          this.state.error = void 0;
          return;
        }
        this.state.validating = false;
        await this.render();
        await this.close();
        this.value = await this.result(this.value);
        this.emit("submit", this.value);
      }
      async cancel(err) {
        this.state.cancelled = this.state.submitted = true;
        await this.render();
        await this.close();
        if (typeof this.options.onCancel === "function") {
          await this.options.onCancel.call(this, this.name, this.value, this);
        }
        this.emit("cancel", await this.error(err));
      }
      async close() {
        this.state.closed = true;
        try {
          let sections = this.sections();
          let lines = Math.ceil(sections.prompt.length / this.width);
          if (sections.rest) {
            this.write(ansi.cursor.down(sections.rest.length));
          }
          this.write("\n".repeat(lines));
        } catch (err) {
        }
        this.emit("close");
      }
      start() {
        if (!this.stop && this.options.show !== false) {
          this.stop = keypress.listen(this, this.keypress.bind(this));
          this.once("close", this.stop);
          this.emit("start", this);
        }
      }
      async skip() {
        this.skipped = this.options.skip === true;
        if (typeof this.options.skip === "function") {
          this.skipped = await this.options.skip.call(this, this.name, this.value);
        }
        return this.skipped;
      }
      async initialize() {
        let { format: format2, options, result } = this;
        this.format = () => format2.call(this, this.value);
        this.result = () => result.call(this, this.value);
        if (typeof options.initial === "function") {
          this.initial = await options.initial.call(this, this);
        }
        if (typeof options.onRun === "function") {
          await options.onRun.call(this, this);
        }
        if (typeof options.onSubmit === "function") {
          let onSubmit = options.onSubmit.bind(this);
          let submit = this.submit.bind(this);
          delete this.options.onSubmit;
          this.submit = async () => {
            await onSubmit(this.name, this.value, this);
            return submit();
          };
        }
        await this.start();
        await this.render();
      }
      render() {
        throw new Error("expected prompt to have a custom render method");
      }
      run() {
        return new Promise(async (resolve, reject) => {
          this.once("submit", resolve);
          this.once("cancel", reject);
          if (await this.skip()) {
            this.render = () => {
            };
            return this.submit();
          }
          await this.initialize();
          this.emit("run");
        });
      }
      async element(name, choice, i) {
        let { options, state, symbols, timers } = this;
        let timer2 = timers && timers[name];
        state.timer = timer2;
        let value = options[name] || state[name] || symbols[name];
        let val = choice && choice[name] != null ? choice[name] : await value;
        if (val === "") return val;
        let res = await this.resolve(val, state, choice, i);
        if (!res && choice && choice[name]) {
          return this.resolve(value, state, choice, i);
        }
        return res;
      }
      async prefix() {
        let element = await this.element("prefix") || this.symbols;
        let timer2 = this.timers && this.timers.prefix;
        let state = this.state;
        state.timer = timer2;
        if (utils.isObject(element)) element = element[state.status] || element.pending;
        if (!utils.hasColor(element)) {
          let style = this.styles[state.status] || this.styles.pending;
          return style(element);
        }
        return element;
      }
      async message() {
        let message2 = await this.element("message");
        if (!utils.hasColor(message2)) {
          return this.styles.strong(message2);
        }
        return message2;
      }
      async separator() {
        let element = await this.element("separator") || this.symbols;
        let timer2 = this.timers && this.timers.separator;
        let state = this.state;
        state.timer = timer2;
        let value = element[state.status] || element.pending || state.separator;
        let ele = await this.resolve(value, state);
        if (utils.isObject(ele)) ele = ele[state.status] || ele.pending;
        if (!utils.hasColor(ele)) {
          return this.styles.muted(ele);
        }
        return ele;
      }
      async pointer(choice, i) {
        let val = await this.element("pointer", choice, i);
        if (typeof val === "string" && utils.hasColor(val)) {
          return val;
        }
        if (val) {
          let styles4 = this.styles;
          let focused = this.index === i;
          let style = focused ? styles4.primary : (val2) => val2;
          let ele = await this.resolve(val[focused ? "on" : "off"] || val, this.state);
          let styled = !utils.hasColor(ele) ? style(ele) : ele;
          return focused ? styled : " ".repeat(ele.length);
        }
      }
      async indicator(choice, i) {
        let val = await this.element("indicator", choice, i);
        if (typeof val === "string" && utils.hasColor(val)) {
          return val;
        }
        if (val) {
          let styles4 = this.styles;
          let enabled = choice.enabled === true;
          let style = enabled ? styles4.success : styles4.dark;
          let ele = val[enabled ? "on" : "off"] || val;
          return !utils.hasColor(ele) ? style(ele) : ele;
        }
        return "";
      }
      body() {
        return null;
      }
      footer() {
        if (this.state.status === "pending") {
          return this.element("footer");
        }
      }
      header() {
        if (this.state.status === "pending") {
          return this.element("header");
        }
      }
      async hint() {
        if (this.state.status === "pending" && !this.isValue(this.state.input)) {
          let hint = await this.element("hint");
          if (!utils.hasColor(hint)) {
            return this.styles.muted(hint);
          }
          return hint;
        }
      }
      error(err) {
        return !this.state.submitted ? err || this.state.error : "";
      }
      format(value) {
        return value;
      }
      result(value) {
        return value;
      }
      validate(value) {
        if (this.options.required === true) {
          return this.isValue(value);
        }
        return true;
      }
      isValue(value) {
        return value != null && value !== "";
      }
      resolve(value, ...args) {
        return utils.resolve(this, value, ...args);
      }
      get base() {
        return _Prompt.prototype;
      }
      get style() {
        return this.styles[this.state.status];
      }
      get height() {
        return this.options.rows || utils.height(this.stdout, 25);
      }
      get width() {
        return this.options.columns || utils.width(this.stdout, 80);
      }
      get size() {
        return { width: this.width, height: this.height };
      }
      set cursor(value) {
        this.state.cursor = value;
      }
      get cursor() {
        return this.state.cursor;
      }
      set input(value) {
        this.state.input = value;
      }
      get input() {
        return this.state.input;
      }
      set value(value) {
        this.state.value = value;
      }
      get value() {
        let { input: input2, value } = this.state;
        let result = [value, input2].find(this.isValue.bind(this));
        return this.isValue(result) ? result : this.initial;
      }
      static get prompt() {
        return (options) => new this(options).run();
      }
    };
    function setOptions(prompt) {
      let isValidKey = (key) => {
        return prompt[key] === void 0 || typeof prompt[key] === "function";
      };
      let ignore = [
        "actions",
        "choices",
        "initial",
        "margin",
        "roles",
        "styles",
        "symbols",
        "theme",
        "timers",
        "value"
      ];
      let ignoreFn = [
        "body",
        "footer",
        "error",
        "header",
        "hint",
        "indicator",
        "message",
        "prefix",
        "separator",
        "skip"
      ];
      for (let key of Object.keys(prompt.options)) {
        if (ignore.includes(key)) continue;
        if (/^on[A-Z]/.test(key)) continue;
        let option = prompt.options[key];
        if (typeof option === "function" && isValidKey(key)) {
          if (!ignoreFn.includes(key)) {
            prompt[key] = option.bind(prompt);
          }
        } else if (typeof prompt[key] !== "function") {
          prompt[key] = option;
        }
      }
    }
    function margin(value) {
      if (typeof value === "number") {
        value = [value, value, value, value];
      }
      let arr = [].concat(value || []);
      let pad = (i) => i % 2 === 0 ? "\n" : " ";
      let res = [];
      for (let i = 0; i < 4; i++) {
        let char = pad(i);
        if (arr[i]) {
          res.push(char.repeat(arr[i]));
        } else {
          res.push("");
        }
      }
      return res;
    }
    module2.exports = Prompt;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/roles.js
var require_roles = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/roles.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    var roles = {
      default(prompt, choice) {
        return choice;
      },
      checkbox(prompt, choice) {
        throw new Error("checkbox role is not implemented yet");
      },
      editable(prompt, choice) {
        throw new Error("editable role is not implemented yet");
      },
      expandable(prompt, choice) {
        throw new Error("expandable role is not implemented yet");
      },
      heading(prompt, choice) {
        choice.disabled = "";
        choice.indicator = [choice.indicator, " "].find((v) => v != null);
        choice.message = choice.message || "";
        return choice;
      },
      input(prompt, choice) {
        throw new Error("input role is not implemented yet");
      },
      option(prompt, choice) {
        return roles.default(prompt, choice);
      },
      radio(prompt, choice) {
        throw new Error("radio role is not implemented yet");
      },
      separator(prompt, choice) {
        choice.disabled = "";
        choice.indicator = [choice.indicator, " "].find((v) => v != null);
        choice.message = choice.message || prompt.symbols.line.repeat(5);
        return choice;
      },
      spacer(prompt, choice) {
        return choice;
      }
    };
    module2.exports = (name, options = {}) => {
      let role = utils.merge({}, roles, options.roles);
      return role[name] || role.default;
    };
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/types/array.js
var require_array = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/types/array.js"(exports2, module2) {
    "use strict";
    var stripAnsi2 = require_strip_ansi();
    var Prompt = require_prompt();
    var roles = require_roles();
    var utils = require_utils();
    var { reorder, scrollUp, scrollDown, isObject, swap } = utils;
    var ArrayPrompt = class extends Prompt {
      constructor(options) {
        super(options);
        this.cursorHide();
        this.maxSelected = options.maxSelected || Infinity;
        this.multiple = options.multiple || false;
        this.initial = options.initial || 0;
        this.delay = options.delay || 0;
        this.longest = 0;
        this.num = "";
      }
      async initialize() {
        if (typeof this.options.initial === "function") {
          this.initial = await this.options.initial.call(this);
        }
        await this.reset(true);
        await super.initialize();
      }
      async reset() {
        let { choices, initial, autofocus, suggest } = this.options;
        this.state._choices = [];
        this.state.choices = [];
        this.choices = await Promise.all(await this.toChoices(choices));
        this.choices.forEach((ch) => ch.enabled = false);
        if (typeof suggest !== "function" && this.selectable.length === 0) {
          throw new Error("At least one choice must be selectable");
        }
        if (isObject(initial)) initial = Object.keys(initial);
        if (Array.isArray(initial)) {
          if (autofocus != null) this.index = this.findIndex(autofocus);
          initial.forEach((v) => this.enable(this.find(v)));
          await this.render();
        } else {
          if (autofocus != null) initial = autofocus;
          if (typeof initial === "string") initial = this.findIndex(initial);
          if (typeof initial === "number" && initial > -1) {
            this.index = Math.max(0, Math.min(initial, this.choices.length));
            this.enable(this.find(this.index));
          }
        }
        if (this.isDisabled(this.focused)) {
          await this.down();
        }
      }
      async toChoices(value, parent) {
        this.state.loadingChoices = true;
        let choices = [];
        let index = 0;
        let toChoices = async (items, parent2) => {
          if (typeof items === "function") items = await items.call(this);
          if (items instanceof Promise) items = await items;
          for (let i = 0; i < items.length; i++) {
            let choice = items[i] = await this.toChoice(items[i], index++, parent2);
            choices.push(choice);
            if (choice.choices) {
              await toChoices(choice.choices, choice);
            }
          }
          return choices;
        };
        return toChoices(value, parent).then((choices2) => {
          this.state.loadingChoices = false;
          return choices2;
        });
      }
      async toChoice(ele, i, parent) {
        if (typeof ele === "function") ele = await ele.call(this, this);
        if (ele instanceof Promise) ele = await ele;
        if (typeof ele === "string") ele = { name: ele };
        if (ele.normalized) return ele;
        ele.normalized = true;
        let origVal = ele.value;
        let role = roles(ele.role, this.options);
        ele = role(this, ele);
        if (typeof ele.disabled === "string" && !ele.hint) {
          ele.hint = ele.disabled;
          ele.disabled = true;
        }
        if (ele.disabled === true && ele.hint == null) {
          ele.hint = "(disabled)";
        }
        if (ele.index != null) return ele;
        ele.name = ele.name || ele.key || ele.title || ele.value || ele.message;
        ele.message = ele.message || ele.name || "";
        ele.value = [ele.value, ele.name].find(this.isValue.bind(this));
        ele.input = "";
        ele.index = i;
        ele.cursor = 0;
        utils.define(ele, "parent", parent);
        ele.level = parent ? parent.level + 1 : 1;
        if (ele.indent == null) {
          ele.indent = parent ? parent.indent + "  " : ele.indent || "";
        }
        ele.path = parent ? parent.path + "." + ele.name : ele.name;
        ele.enabled = !!(this.multiple && !this.isDisabled(ele) && (ele.enabled || this.isSelected(ele)));
        if (!this.isDisabled(ele)) {
          this.longest = Math.max(this.longest, stripAnsi2(ele.message).length);
        }
        let choice = { ...ele };
        ele.reset = (input2 = choice.input, value = choice.value) => {
          for (let key of Object.keys(choice)) ele[key] = choice[key];
          ele.input = input2;
          ele.value = value;
        };
        if (origVal == null && typeof ele.initial === "function") {
          ele.input = await ele.initial.call(this, this.state, ele, i);
        }
        return ele;
      }
      async onChoice(choice, i) {
        this.emit("choice", choice, i, this);
        if (typeof choice.onChoice === "function") {
          await choice.onChoice.call(this, this.state, choice, i);
        }
      }
      async addChoice(ele, i, parent) {
        let choice = await this.toChoice(ele, i, parent);
        this.choices.push(choice);
        this.index = this.choices.length - 1;
        this.limit = this.choices.length;
        return choice;
      }
      async newItem(item, i, parent) {
        let ele = { name: "New choice name?", editable: true, newChoice: true, ...item };
        let choice = await this.addChoice(ele, i, parent);
        choice.updateChoice = () => {
          delete choice.newChoice;
          choice.name = choice.message = choice.input;
          choice.input = "";
          choice.cursor = 0;
        };
        return this.render();
      }
      indent(choice) {
        if (choice.indent == null) {
          return choice.level > 1 ? "  ".repeat(choice.level - 1) : "";
        }
        return choice.indent;
      }
      dispatch(s, key) {
        if (this.multiple && this[key.name]) return this[key.name]();
        this.alert();
      }
      focus(choice, enabled) {
        if (typeof enabled !== "boolean") enabled = choice.enabled;
        if (enabled && !choice.enabled && this.selected.length >= this.maxSelected) {
          return this.alert();
        }
        this.index = choice.index;
        choice.enabled = enabled && !this.isDisabled(choice);
        return choice;
      }
      space() {
        if (!this.multiple) return this.alert();
        if (!this.focused) return;
        this.toggle(this.focused);
        return this.render();
      }
      a() {
        if (this.maxSelected < this.choices.length) return this.alert();
        let enabled = this.selectable.every((ch) => ch.enabled);
        this.choices.forEach((ch) => ch.enabled = !enabled);
        return this.render();
      }
      i() {
        if (this.choices.length - this.selected.length > this.maxSelected) {
          return this.alert();
        }
        this.choices.forEach((ch) => ch.enabled = !ch.enabled);
        return this.render();
      }
      g() {
        if (!this.choices.some((ch) => !!ch.parent)) return this.a();
        const focused = this.focused;
        this.toggle(focused.parent && !focused.choices ? focused.parent : focused);
        return this.render();
      }
      toggle(choice, enabled) {
        if (!choice.enabled && this.selected.length >= this.maxSelected) {
          return this.alert();
        }
        if (typeof enabled !== "boolean") enabled = !choice.enabled;
        choice.enabled = enabled;
        if (choice.choices) {
          choice.choices.forEach((ch) => this.toggle(ch, enabled));
        }
        let parent = choice.parent;
        while (parent) {
          let choices = parent.choices.filter((ch) => this.isDisabled(ch));
          parent.enabled = choices.every((ch) => ch.enabled === true);
          parent = parent.parent;
        }
        reset2(this, this.choices);
        this.emit("toggle", choice, this);
        return choice;
      }
      enable(choice) {
        if (this.selected.length >= this.maxSelected) return this.alert();
        choice.enabled = !this.isDisabled(choice);
        choice.choices && choice.choices.forEach(this.enable.bind(this));
        return choice;
      }
      disable(choice) {
        choice.enabled = false;
        choice.choices && choice.choices.forEach(this.disable.bind(this));
        return choice;
      }
      number(n) {
        this.num += n;
        let number = (num) => {
          let i = Number(num);
          if (i > this.choices.length - 1) return this.alert();
          let focused = this.focused;
          let choice = this.choices.find((ch) => i === ch.index);
          if (!choice.enabled && this.selected.length >= this.maxSelected) {
            return this.alert();
          }
          if (this.visible.indexOf(choice) === -1) {
            let choices = reorder(this.choices);
            let actualIdx = choices.indexOf(choice);
            if (focused.index > actualIdx) {
              let start = choices.slice(actualIdx, actualIdx + this.limit);
              let end = choices.filter((ch) => !start.includes(ch));
              this.choices = start.concat(end);
            } else {
              let pos = actualIdx - this.limit + 1;
              this.choices = choices.slice(pos).concat(choices.slice(0, pos));
            }
          }
          this.index = this.choices.indexOf(choice);
          this.toggle(this.focused);
          return this.render();
        };
        clearTimeout(this.numberTimeout);
        return new Promise((resolve) => {
          let len = this.choices.length;
          let num = this.num;
          let handle = (val = false, res) => {
            clearTimeout(this.numberTimeout);
            if (val) res = number(num);
            this.num = "";
            resolve(res);
          };
          if (num === "0" || num.length === 1 && Number(num + "0") > len) {
            return handle(true);
          }
          if (Number(num) > len) {
            return handle(false, this.alert());
          }
          this.numberTimeout = setTimeout(() => handle(true), this.delay);
        });
      }
      home() {
        this.choices = reorder(this.choices);
        this.index = 0;
        return this.render();
      }
      end() {
        let pos = this.choices.length - this.limit;
        let choices = reorder(this.choices);
        this.choices = choices.slice(pos).concat(choices.slice(0, pos));
        this.index = this.limit - 1;
        return this.render();
      }
      first() {
        this.index = 0;
        return this.render();
      }
      last() {
        this.index = this.visible.length - 1;
        return this.render();
      }
      prev() {
        if (this.visible.length <= 1) return this.alert();
        return this.up();
      }
      next() {
        if (this.visible.length <= 1) return this.alert();
        return this.down();
      }
      right() {
        if (this.cursor >= this.input.length) return this.alert();
        this.cursor++;
        return this.render();
      }
      left() {
        if (this.cursor <= 0) return this.alert();
        this.cursor--;
        return this.render();
      }
      up() {
        let len = this.choices.length;
        let vis = this.visible.length;
        let idx = this.index;
        if (this.options.scroll === false && idx === 0) {
          return this.alert();
        }
        if (len > vis && idx === 0) {
          return this.scrollUp();
        }
        this.index = (idx - 1 % len + len) % len;
        if (this.isDisabled() && !this.allChoicesAreDisabled()) {
          return this.up();
        }
        return this.render();
      }
      down() {
        let len = this.choices.length;
        let vis = this.visible.length;
        let idx = this.index;
        if (this.options.scroll === false && idx === vis - 1) {
          return this.alert();
        }
        if (len > vis && idx === vis - 1) {
          return this.scrollDown();
        }
        this.index = (idx + 1) % len;
        if (this.isDisabled() && !this.allChoicesAreDisabled()) {
          return this.down();
        }
        return this.render();
      }
      scrollUp(i = 0) {
        this.choices = scrollUp(this.choices);
        this.index = i;
        if (this.isDisabled()) {
          return this.up();
        }
        return this.render();
      }
      scrollDown(i = this.visible.length - 1) {
        this.choices = scrollDown(this.choices);
        this.index = i;
        if (this.isDisabled()) {
          return this.down();
        }
        return this.render();
      }
      async shiftUp() {
        if (this.options.sort === true) {
          this.sorting = true;
          this.swap(this.index - 1);
          await this.up();
          this.sorting = false;
          return;
        }
        return this.scrollUp(this.index);
      }
      async shiftDown() {
        if (this.options.sort === true) {
          this.sorting = true;
          this.swap(this.index + 1);
          await this.down();
          this.sorting = false;
          return;
        }
        return this.scrollDown(this.index);
      }
      pageUp() {
        if (this.visible.length <= 1) return this.alert();
        this.limit = Math.max(this.limit - 1, 0);
        this.index = Math.min(this.limit - 1, this.index);
        this._limit = this.limit;
        if (this.isDisabled()) {
          return this.up();
        }
        return this.render();
      }
      pageDown() {
        if (this.visible.length >= this.choices.length) return this.alert();
        this.index = Math.max(0, this.index);
        this.limit = Math.min(this.limit + 1, this.choices.length);
        this._limit = this.limit;
        if (this.isDisabled()) {
          return this.down();
        }
        return this.render();
      }
      swap(pos) {
        swap(this.choices, this.index, pos);
      }
      allChoicesAreDisabled(choices = this.choices) {
        return choices.every((choice) => this.isDisabled(choice));
      }
      isDisabled(choice = this.focused) {
        let keys = ["disabled", "collapsed", "hidden", "completing", "readonly"];
        if (choice && keys.some((key) => choice[key] === true)) {
          return true;
        }
        return choice && choice.role === "heading";
      }
      isEnabled(choice = this.focused) {
        if (Array.isArray(choice)) return choice.every((ch) => this.isEnabled(ch));
        if (choice.choices) {
          let choices = choice.choices.filter((ch) => !this.isDisabled(ch));
          return choice.enabled && choices.every((ch) => this.isEnabled(ch));
        }
        return choice.enabled && !this.isDisabled(choice);
      }
      isChoice(choice, value) {
        return choice.name === value || choice.index === Number(value);
      }
      isSelected(choice) {
        if (Array.isArray(this.initial)) {
          return this.initial.some((value) => this.isChoice(choice, value));
        }
        return this.isChoice(choice, this.initial);
      }
      map(names = [], prop = "value") {
        return [].concat(names || []).reduce((acc, name) => {
          acc[name] = this.find(name, prop);
          return acc;
        }, {});
      }
      filter(value, prop) {
        let isChoice = (ele, i) => [ele.name, i].includes(value);
        let fn = typeof value === "function" ? value : isChoice;
        let choices = this.options.multiple ? this.state._choices : this.choices;
        let result = choices.filter(fn);
        if (prop) {
          return result.map((ch) => ch[prop]);
        }
        return result;
      }
      find(value, prop) {
        if (isObject(value)) return prop ? value[prop] : value;
        let isChoice = (ele, i) => [ele.name, i].includes(value);
        let fn = typeof value === "function" ? value : isChoice;
        let choice = this.choices.find(fn);
        if (choice) {
          return prop ? choice[prop] : choice;
        }
      }
      findIndex(value) {
        return this.choices.indexOf(this.find(value));
      }
      async submit() {
        let choice = this.focused;
        if (!choice) return this.alert();
        if (choice.newChoice) {
          if (!choice.input) return this.alert();
          choice.updateChoice();
          return this.render();
        }
        if (this.choices.some((ch) => ch.newChoice)) {
          return this.alert();
        }
        let { reorder: reorder2, sort } = this.options;
        let multi = this.multiple === true;
        let value = this.selected;
        if (value === void 0) {
          return this.alert();
        }
        if (Array.isArray(value) && reorder2 !== false && sort !== true) {
          value = utils.reorder(value);
        }
        this.value = multi ? value.map((ch) => ch.name) : value.name;
        return super.submit();
      }
      set choices(choices = []) {
        this.state._choices = this.state._choices || [];
        this.state.choices = choices;
        for (let choice of choices) {
          if (!this.state._choices.some((ch) => ch.name === choice.name)) {
            this.state._choices.push(choice);
          }
        }
        if (!this._initial && this.options.initial) {
          this._initial = true;
          let init = this.initial;
          if (typeof init === "string" || typeof init === "number") {
            let choice = this.find(init);
            if (choice) {
              this.initial = choice.index;
              this.focus(choice, true);
            }
          }
        }
      }
      get choices() {
        return reset2(this, this.state.choices || []);
      }
      set visible(visible) {
        this.state.visible = visible;
      }
      get visible() {
        return (this.state.visible || this.choices).slice(0, this.limit);
      }
      set limit(num) {
        this.state.limit = num;
      }
      get limit() {
        let { state, options, choices } = this;
        let limit = state.limit || this._limit || options.limit || choices.length;
        return Math.min(limit, this.height);
      }
      set value(value) {
        super.value = value;
      }
      get value() {
        if (typeof super.value !== "string" && super.value === this.initial) {
          return this.input;
        }
        return super.value;
      }
      set index(i) {
        this.state.index = i;
      }
      get index() {
        return Math.max(0, this.state ? this.state.index : 0);
      }
      get enabled() {
        return this.filter(this.isEnabled.bind(this));
      }
      get focused() {
        let choice = this.choices[this.index];
        if (choice && this.state.submitted && this.multiple !== true) {
          choice.enabled = true;
        }
        return choice;
      }
      get selectable() {
        return this.choices.filter((choice) => !this.isDisabled(choice));
      }
      get selected() {
        return this.multiple ? this.enabled : this.focused;
      }
    };
    function reset2(prompt, choices) {
      if (choices instanceof Promise) return choices;
      if (typeof choices === "function") {
        if (utils.isAsyncFn(choices)) return choices;
        choices = choices.call(prompt, prompt);
      }
      for (let choice of choices) {
        if (Array.isArray(choice.choices)) {
          let items = choice.choices.filter((ch) => !prompt.isDisabled(ch));
          choice.enabled = items.every((ch) => ch.enabled === true);
        }
        if (prompt.isDisabled(choice) === true) {
          delete choice.enabled;
        }
      }
      return choices;
    }
    module2.exports = ArrayPrompt;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/select.js
var require_select = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/select.js"(exports2, module2) {
    "use strict";
    var ArrayPrompt = require_array();
    var utils = require_utils();
    var SelectPrompt = class extends ArrayPrompt {
      constructor(options) {
        super(options);
        this.emptyError = this.options.emptyError || "No items were selected";
      }
      async dispatch(s, key) {
        if (this.multiple) {
          return this[key.name] ? await this[key.name](s, key) : await super.dispatch(s, key);
        }
        this.alert();
      }
      separator() {
        if (this.options.separator) return super.separator();
        let sep = this.styles.muted(this.symbols.ellipsis);
        return this.state.submitted ? super.separator() : sep;
      }
      pointer(choice, i) {
        return !this.multiple || this.options.pointer ? super.pointer(choice, i) : "";
      }
      indicator(choice, i) {
        return this.multiple ? super.indicator(choice, i) : "";
      }
      choiceMessage(choice, i) {
        let message2 = this.resolve(choice.message, this.state, choice, i);
        if (choice.role === "heading" && !utils.hasColor(message2)) {
          message2 = this.styles.strong(message2);
        }
        return this.resolve(message2, this.state, choice, i);
      }
      choiceSeparator() {
        return ":";
      }
      async renderChoice(choice, i) {
        await this.onChoice(choice, i);
        let focused = this.index === i;
        let pointer = await this.pointer(choice, i);
        let check = await this.indicator(choice, i) + (choice.pad || "");
        let hint = await this.resolve(choice.hint, this.state, choice, i);
        if (hint && !utils.hasColor(hint)) {
          hint = this.styles.muted(hint);
        }
        let ind = this.indent(choice);
        let msg = await this.choiceMessage(choice, i);
        let line = () => [this.margin[3], ind + pointer + check, msg, this.margin[1], hint].filter(Boolean).join(" ");
        if (choice.role === "heading") {
          return line();
        }
        if (choice.disabled) {
          if (!utils.hasColor(msg)) {
            msg = this.styles.disabled(msg);
          }
          return line();
        }
        if (focused) {
          msg = this.styles.em(msg);
        }
        return line();
      }
      async renderChoices() {
        if (this.state.loading === "choices") {
          return this.styles.warning("Loading choices");
        }
        if (this.state.submitted) return "";
        let choices = this.visible.map(async (ch, i) => await this.renderChoice(ch, i));
        let visible = await Promise.all(choices);
        if (!visible.length) visible.push(this.styles.danger("No matching choices"));
        let result = this.margin[0] + visible.join("\n");
        let header;
        if (this.options.choicesHeader) {
          header = await this.resolve(this.options.choicesHeader, this.state);
        }
        return [header, result].filter(Boolean).join("\n");
      }
      format() {
        if (!this.state.submitted || this.state.cancelled) return "";
        if (Array.isArray(this.selected)) {
          return this.selected.map((choice) => this.styles.primary(choice.name)).join(", ");
        }
        return this.styles.primary(this.selected.name);
      }
      async render() {
        let { submitted, size } = this.state;
        let prompt = "";
        let header = await this.header();
        let prefix = await this.prefix();
        let separator = await this.separator();
        let message2 = await this.message();
        if (this.options.promptLine !== false) {
          prompt = [prefix, message2, separator, ""].join(" ");
          this.state.prompt = prompt;
        }
        let output2 = await this.format();
        let help = await this.error() || await this.hint();
        let body = await this.renderChoices();
        let footer = await this.footer();
        if (output2) prompt += output2;
        if (help && !prompt.includes(help)) prompt += " " + help;
        if (submitted && !output2 && !body.trim() && this.multiple && this.emptyError != null) {
          prompt += this.styles.danger(this.emptyError);
        }
        this.clear(size);
        this.write([header, prompt, body, footer].filter(Boolean).join("\n"));
        this.write(this.margin[2]);
        this.restore();
      }
    };
    module2.exports = SelectPrompt;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/autocomplete.js
var require_autocomplete = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/autocomplete.js"(exports2, module2) {
    "use strict";
    var Select2 = require_select();
    var highlight = (input2, color) => {
      const regex2 = input2 ? new RegExp(input2, "ig") : /$^/;
      return (str) => {
        return input2 ? str.replace(regex2, (match) => color(match)) : str;
      };
    };
    var AutoComplete = class extends Select2 {
      constructor(options) {
        super(options);
        this.cursorShow();
      }
      moveCursor(n) {
        this.state.cursor += n;
      }
      dispatch(ch) {
        return this.append(ch);
      }
      space(ch) {
        return this.options.multiple ? super.space(ch) : this.append(ch);
      }
      append(ch) {
        let { cursor, input: input2 } = this.state;
        this.input = input2.slice(0, cursor) + ch + input2.slice(cursor);
        this.moveCursor(1);
        return this.complete();
      }
      delete() {
        let { cursor, input: input2 } = this.state;
        if (!input2) return this.alert();
        this.input = input2.slice(0, cursor - 1) + input2.slice(cursor);
        this.moveCursor(-1);
        return this.complete();
      }
      deleteForward() {
        let { cursor, input: input2 } = this.state;
        if (input2[cursor] === void 0) return this.alert();
        this.input = `${input2}`.slice(0, cursor) + `${input2}`.slice(cursor + 1);
        return this.complete();
      }
      number(ch) {
        return this.append(ch);
      }
      async complete() {
        this.completing = true;
        this.choices = await this.suggest(this.input, this.state._choices);
        this.state.limit = void 0;
        this.index = Math.min(Math.max(this.visible.length - 1, 0), this.index);
        await this.render();
        this.completing = false;
      }
      suggest(input2 = this.input, choices = this.state._choices) {
        if (typeof this.options.suggest === "function") {
          return this.options.suggest.call(this, input2, choices);
        }
        let str = input2.toLowerCase();
        return choices.filter((ch) => ch.message.toLowerCase().includes(str));
      }
      pointer() {
        return "";
      }
      format() {
        if (!this.focused) return this.input;
        if (this.options.multiple && this.state.submitted) {
          return this.selected.map((ch) => this.styles.primary(ch.message)).join(", ");
        }
        if (this.state.submitted) {
          let value = this.value = this.input = this.focused.value;
          return this.styles.primary(value);
        }
        return this.input;
      }
      async render() {
        if (this.state.status !== "pending") return super.render();
        const hl = this.options.highlight || this.styles.complement;
        const style = (input2, color2) => {
          if (!input2) return input2;
          if (hl.stack) return hl(input2);
          return hl.call(this, input2);
        };
        const color = highlight(this.input, style);
        const choices = this.choices;
        this.choices = choices.map((ch) => ({ ...ch, message: color(ch.message) }));
        await super.render();
        this.choices = choices;
      }
      submit() {
        if (this.options.multiple) {
          this.value = this.selected.map((ch) => ch.name);
        }
        return super.submit();
      }
    };
    module2.exports = AutoComplete;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/placeholder.js
var require_placeholder = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/placeholder.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    module2.exports = (prompt, options = {}) => {
      prompt.cursorHide();
      let { input: input2 = "", initial = "", pos, showCursor = true, color } = options;
      let style = color || prompt.styles.placeholder;
      let inverse2 = utils.inverse(prompt.styles.primary);
      let blinker = (str) => inverse2(prompt.styles.black(str));
      let output2 = input2;
      let char = " ";
      let reverse = blinker(char);
      if (prompt.blink && prompt.blink.off === true) {
        blinker = (str) => str;
        reverse = "";
      }
      if (showCursor && pos === 0 && initial === "" && input2 === "") {
        return blinker(char);
      }
      if (showCursor && pos === 0 && (input2 === initial || input2 === "")) {
        return blinker(initial[0]) + style(initial.slice(1));
      }
      initial = utils.isPrimitive(initial) ? `${initial}` : "";
      input2 = utils.isPrimitive(input2) ? `${input2}` : "";
      let placeholder = initial && initial.startsWith(input2) && initial !== input2;
      let cursor = placeholder ? blinker(initial[input2.length]) : reverse;
      if (pos !== input2.length && showCursor === true) {
        output2 = input2.slice(0, pos) + blinker(input2[pos]) + input2.slice(pos + 1);
        cursor = "";
      }
      if (showCursor === false) {
        cursor = "";
      }
      if (placeholder) {
        let raw = prompt.styles.unstyle(output2 + cursor);
        return output2 + cursor + style(initial.slice(raw.length));
      }
      return output2 + cursor;
    };
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/form.js
var require_form = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/form.js"(exports2, module2) {
    "use strict";
    var stripAnsi2 = require_strip_ansi();
    var SelectPrompt = require_select();
    var placeholder = require_placeholder();
    var FormPrompt = class extends SelectPrompt {
      constructor(options) {
        super({ ...options, multiple: true });
        this.type = "form";
        this.initial = this.options.initial;
        this.align = [this.options.align, "right"].find((v) => v != null);
        this.emptyError = "";
        this.values = {};
      }
      async reset(first) {
        await super.reset();
        if (first === true) this._index = this.index;
        this.index = this._index;
        this.values = {};
        this.choices.forEach((choice) => choice.reset && choice.reset());
        return this.render();
      }
      dispatch(char) {
        return !!char && this.append(char);
      }
      append(char) {
        let choice = this.focused;
        if (!choice) return this.alert();
        let { cursor, input: input2 } = choice;
        choice.value = choice.input = input2.slice(0, cursor) + char + input2.slice(cursor);
        choice.cursor++;
        return this.render();
      }
      delete() {
        let choice = this.focused;
        if (!choice || choice.cursor <= 0) return this.alert();
        let { cursor, input: input2 } = choice;
        choice.value = choice.input = input2.slice(0, cursor - 1) + input2.slice(cursor);
        choice.cursor--;
        return this.render();
      }
      deleteForward() {
        let choice = this.focused;
        if (!choice) return this.alert();
        let { cursor, input: input2 } = choice;
        if (input2[cursor] === void 0) return this.alert();
        let str = `${input2}`.slice(0, cursor) + `${input2}`.slice(cursor + 1);
        choice.value = choice.input = str;
        return this.render();
      }
      right() {
        let choice = this.focused;
        if (!choice) return this.alert();
        if (choice.cursor >= choice.input.length) return this.alert();
        choice.cursor++;
        return this.render();
      }
      left() {
        let choice = this.focused;
        if (!choice) return this.alert();
        if (choice.cursor <= 0) return this.alert();
        choice.cursor--;
        return this.render();
      }
      space(ch, key) {
        return this.dispatch(ch, key);
      }
      number(ch, key) {
        return this.dispatch(ch, key);
      }
      next() {
        let ch = this.focused;
        if (!ch) return this.alert();
        let { initial, input: input2 } = ch;
        if (initial && initial.startsWith(input2) && input2 !== initial) {
          ch.value = ch.input = initial;
          ch.cursor = ch.value.length;
          return this.render();
        }
        return super.next();
      }
      prev() {
        let ch = this.focused;
        if (!ch) return this.alert();
        if (ch.cursor === 0) return super.prev();
        ch.value = ch.input = "";
        ch.cursor = 0;
        return this.render();
      }
      separator() {
        return "";
      }
      format(value) {
        return !this.state.submitted ? super.format(value) : "";
      }
      pointer() {
        return "";
      }
      indicator(choice) {
        return choice.input ? "\u29BF" : "\u2299";
      }
      async choiceSeparator(choice, i) {
        let sep = await this.resolve(choice.separator, this.state, choice, i) || ":";
        return sep ? " " + this.styles.disabled(sep) : "";
      }
      async renderChoice(choice, i) {
        await this.onChoice(choice, i);
        let { state, styles: styles4 } = this;
        let { cursor, initial = "", name, input: input2 = "" } = choice;
        let { muted, submitted, primary, danger } = styles4;
        let focused = this.index === i;
        let validate2 = choice.validate || (() => true);
        let sep = await this.choiceSeparator(choice, i);
        let msg = choice.message;
        if (this.align === "right") msg = msg.padStart(this.longest + 1, " ");
        if (this.align === "left") msg = msg.padEnd(this.longest + 1, " ");
        let value = this.values[name] = input2 || initial;
        let color = input2 ? "success" : "dark";
        if (await validate2.call(choice, value, this.state) !== true) {
          color = "danger";
        }
        let style = styles4[color];
        let indicator = style(await this.indicator(choice, i)) + (choice.pad || "");
        let indent = this.indent(choice);
        let line = () => [indent, indicator, msg + sep, input2].filter(Boolean).join(" ");
        if (state.submitted) {
          msg = stripAnsi2(msg);
          input2 = submitted(input2);
          return line();
        }
        if (choice.format) {
          input2 = await choice.format.call(this, input2, choice, i);
        } else {
          let color2 = this.styles.muted;
          let options = { input: input2, initial, pos: cursor, showCursor: focused, color: color2 };
          input2 = placeholder(this, options);
        }
        if (!this.isValue(input2)) {
          input2 = this.styles.muted(this.symbols.ellipsis);
        }
        if (choice.result) {
          this.values[name] = await choice.result.call(this, value, choice, i);
        }
        if (focused) {
          msg = primary(msg);
        }
        if (choice.error) {
          input2 += (input2 ? " " : "") + danger(choice.error.trim());
        } else if (choice.hint) {
          input2 += (input2 ? " " : "") + muted(choice.hint.trim());
        }
        return line();
      }
      async submit() {
        this.value = this.values;
        return super.base.submit.call(this);
      }
    };
    module2.exports = FormPrompt;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/types/auth.js
var require_auth = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/types/auth.js"(exports2, module2) {
    "use strict";
    var FormPrompt = require_form();
    var defaultAuthenticate = () => {
      throw new Error("expected prompt to have a custom authenticate method");
    };
    var factory = (authenticate = defaultAuthenticate) => {
      class AuthPrompt extends FormPrompt {
        constructor(options) {
          super(options);
        }
        async submit() {
          this.value = await authenticate.call(this, this.values, this.state);
          super.base.submit.call(this);
        }
        static create(authenticate2) {
          return factory(authenticate2);
        }
      }
      return AuthPrompt;
    };
    module2.exports = factory();
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/basicauth.js
var require_basicauth = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/basicauth.js"(exports2, module2) {
    "use strict";
    var AuthPrompt = require_auth();
    function defaultAuthenticate(value, state) {
      if (value.username === this.options.username && value.password === this.options.password) {
        return true;
      }
      return false;
    }
    var factory = (authenticate = defaultAuthenticate) => {
      const choices = [
        { name: "username", message: "username" },
        {
          name: "password",
          message: "password",
          format(input2) {
            if (this.options.showPassword) {
              return input2;
            }
            let color = this.state.submitted ? this.styles.primary : this.styles.muted;
            return color(this.symbols.asterisk.repeat(input2.length));
          }
        }
      ];
      class BasicAuthPrompt extends AuthPrompt.create(authenticate) {
        constructor(options) {
          super({ ...options, choices });
        }
        static create(authenticate2) {
          return factory(authenticate2);
        }
      }
      return BasicAuthPrompt;
    };
    module2.exports = factory();
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/types/boolean.js
var require_boolean = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/types/boolean.js"(exports2, module2) {
    "use strict";
    var Prompt = require_prompt();
    var { isPrimitive, hasColor } = require_utils();
    var BooleanPrompt = class extends Prompt {
      constructor(options) {
        super(options);
        this.cursorHide();
      }
      async initialize() {
        let initial = await this.resolve(this.initial, this.state);
        this.input = await this.cast(initial);
        await super.initialize();
      }
      dispatch(ch) {
        if (!this.isValue(ch)) return this.alert();
        this.input = ch;
        return this.submit();
      }
      format(value) {
        let { styles: styles4, state } = this;
        return !state.submitted ? styles4.primary(value) : styles4.success(value);
      }
      cast(input2) {
        return this.isTrue(input2);
      }
      isTrue(input2) {
        return /^[ty1]/i.test(input2);
      }
      isFalse(input2) {
        return /^[fn0]/i.test(input2);
      }
      isValue(value) {
        return isPrimitive(value) && (this.isTrue(value) || this.isFalse(value));
      }
      async hint() {
        if (this.state.status === "pending") {
          let hint = await this.element("hint");
          if (!hasColor(hint)) {
            return this.styles.muted(hint);
          }
          return hint;
        }
      }
      async render() {
        let { input: input2, size } = this.state;
        let prefix = await this.prefix();
        let sep = await this.separator();
        let msg = await this.message();
        let hint = this.styles.muted(this.default);
        let promptLine = [prefix, msg, hint, sep].filter(Boolean).join(" ");
        this.state.prompt = promptLine;
        let header = await this.header();
        let value = this.value = this.cast(input2);
        let output2 = await this.format(value);
        let help = await this.error() || await this.hint();
        let footer = await this.footer();
        if (help && !promptLine.includes(help)) output2 += " " + help;
        promptLine += " " + output2;
        this.clear(size);
        this.write([header, promptLine, footer].filter(Boolean).join("\n"));
        this.restore();
      }
      set value(value) {
        super.value = value;
      }
      get value() {
        return this.cast(super.value);
      }
    };
    module2.exports = BooleanPrompt;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/confirm.js
var require_confirm = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/confirm.js"(exports2, module2) {
    "use strict";
    var BooleanPrompt = require_boolean();
    var ConfirmPrompt = class extends BooleanPrompt {
      constructor(options) {
        super(options);
        this.default = this.options.default || (this.initial ? "(Y/n)" : "(y/N)");
      }
    };
    module2.exports = ConfirmPrompt;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/editable.js
var require_editable = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/editable.js"(exports2, module2) {
    "use strict";
    var Select2 = require_select();
    var Form = require_form();
    var form = Form.prototype;
    var Editable = class extends Select2 {
      constructor(options) {
        super({ ...options, multiple: true });
        this.align = [this.options.align, "left"].find((v) => v != null);
        this.emptyError = "";
        this.values = {};
      }
      dispatch(char, key) {
        let choice = this.focused;
        let parent = choice.parent || {};
        if (!choice.editable && !parent.editable) {
          if (char === "a" || char === "i") return super[char]();
        }
        return form.dispatch.call(this, char, key);
      }
      append(char, key) {
        return form.append.call(this, char, key);
      }
      delete(char, key) {
        return form.delete.call(this, char, key);
      }
      space(char) {
        return this.focused.editable ? this.append(char) : super.space();
      }
      number(char) {
        return this.focused.editable ? this.append(char) : super.number(char);
      }
      next() {
        return this.focused.editable ? form.next.call(this) : super.next();
      }
      prev() {
        return this.focused.editable ? form.prev.call(this) : super.prev();
      }
      async indicator(choice, i) {
        let symbol = choice.indicator || "";
        let value = choice.editable ? symbol : super.indicator(choice, i);
        return await this.resolve(value, this.state, choice, i) || "";
      }
      indent(choice) {
        return choice.role === "heading" ? "" : choice.editable ? " " : "  ";
      }
      async renderChoice(choice, i) {
        choice.indent = "";
        if (choice.editable) return form.renderChoice.call(this, choice, i);
        return super.renderChoice(choice, i);
      }
      error() {
        return "";
      }
      footer() {
        return this.state.error;
      }
      async validate() {
        let result = true;
        for (let choice of this.choices) {
          if (typeof choice.validate !== "function") {
            continue;
          }
          if (choice.role === "heading") {
            continue;
          }
          let val = choice.parent ? this.value[choice.parent.name] : this.value;
          if (choice.editable) {
            val = choice.value === choice.name ? choice.initial || "" : choice.value;
          } else if (!this.isDisabled(choice)) {
            val = choice.enabled === true;
          }
          result = await choice.validate(val, this.state);
          if (result !== true) {
            break;
          }
        }
        if (result !== true) {
          this.state.error = typeof result === "string" ? result : "Invalid Input";
        }
        return result;
      }
      submit() {
        if (this.focused.newChoice === true) return super.submit();
        if (this.choices.some((ch) => ch.newChoice)) {
          return this.alert();
        }
        this.value = {};
        for (let choice of this.choices) {
          let val = choice.parent ? this.value[choice.parent.name] : this.value;
          if (choice.role === "heading") {
            this.value[choice.name] = {};
            continue;
          }
          if (choice.editable) {
            val[choice.name] = choice.value === choice.name ? choice.initial || "" : choice.value;
          } else if (!this.isDisabled(choice)) {
            val[choice.name] = choice.enabled === true;
          }
        }
        return this.base.submit.call(this);
      }
    };
    module2.exports = Editable;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/types/string.js
var require_string = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/types/string.js"(exports2, module2) {
    "use strict";
    var Prompt = require_prompt();
    var keypress = require_keypress();
    var placeholder = require_placeholder();
    var { isPrimitive } = require_utils();
    var StringPrompt = class extends Prompt {
      constructor(options) {
        super(options);
        this.initial = isPrimitive(this.initial) ? String(this.initial) : "";
        if (this.initial) this.cursorHide();
        this.state.prevCursor = 0;
        this.state.clipboard = [];
        this.keypressTimeout = this.options.keypressTimeout !== void 0 ? this.options.keypressTimeout : null;
      }
      async keypress(input2, key = input2 ? keypress(input2, {}) : {}) {
        const now = Date.now();
        const elapsed = now - this.lastKeypress;
        this.lastKeypress = now;
        const isEnterKey = key.name === "return" || key.name === "enter";
        let prev = this.state.prevKeypress;
        let append;
        this.state.prevKeypress = key;
        if (this.keypressTimeout != null && isEnterKey) {
          if (elapsed < this.keypressTimeout) {
            return this.submit();
          }
          this.state.multilineBuffer = this.state.multilineBuffer || "";
          this.state.multilineBuffer += input2;
          append = true;
          prev = null;
        }
        if (append || this.options.multiline && isEnterKey) {
          if (!prev || prev.name !== "return") {
            return this.append("\n", key);
          }
        }
        return super.keypress(input2, key);
      }
      moveCursor(n) {
        this.cursor += n;
      }
      reset() {
        this.input = this.value = "";
        this.cursor = 0;
        return this.render();
      }
      dispatch(ch, key) {
        if (!ch || key.ctrl || key.code) return this.alert();
        this.append(ch);
      }
      append(ch) {
        let { cursor, input: input2 } = this.state;
        this.input = `${input2}`.slice(0, cursor) + ch + `${input2}`.slice(cursor);
        this.moveCursor(String(ch).length);
        this.render();
      }
      insert(str) {
        this.append(str);
      }
      delete() {
        let { cursor, input: input2 } = this.state;
        if (cursor <= 0) return this.alert();
        this.input = `${input2}`.slice(0, cursor - 1) + `${input2}`.slice(cursor);
        this.moveCursor(-1);
        this.render();
      }
      deleteForward() {
        let { cursor, input: input2 } = this.state;
        if (input2[cursor] === void 0) return this.alert();
        this.input = `${input2}`.slice(0, cursor) + `${input2}`.slice(cursor + 1);
        this.render();
      }
      cutForward() {
        let pos = this.cursor;
        if (this.input.length <= pos) return this.alert();
        this.state.clipboard.push(this.input.slice(pos));
        this.input = this.input.slice(0, pos);
        this.render();
      }
      cutLeft() {
        let pos = this.cursor;
        if (pos === 0) return this.alert();
        let before = this.input.slice(0, pos);
        let after = this.input.slice(pos);
        let words = before.split(" ");
        this.state.clipboard.push(words.pop());
        this.input = words.join(" ");
        this.cursor = this.input.length;
        this.input += after;
        this.render();
      }
      paste() {
        if (!this.state.clipboard.length) return this.alert();
        this.insert(this.state.clipboard.pop());
        this.render();
      }
      toggleCursor() {
        if (this.state.prevCursor) {
          this.cursor = this.state.prevCursor;
          this.state.prevCursor = 0;
        } else {
          this.state.prevCursor = this.cursor;
          this.cursor = 0;
        }
        this.render();
      }
      first() {
        this.cursor = 0;
        this.render();
      }
      last() {
        this.cursor = this.input.length - 1;
        this.render();
      }
      next() {
        let init = this.initial != null ? String(this.initial) : "";
        if (!init || !init.startsWith(this.input)) return this.alert();
        this.input = this.initial;
        this.cursor = this.initial.length;
        this.render();
      }
      prev() {
        if (!this.input) return this.alert();
        this.reset();
      }
      backward() {
        return this.left();
      }
      forward() {
        return this.right();
      }
      right() {
        if (this.cursor >= this.input.length) return this.alert();
        this.moveCursor(1);
        return this.render();
      }
      left() {
        if (this.cursor <= 0) return this.alert();
        this.moveCursor(-1);
        return this.render();
      }
      isValue(value) {
        return !!value;
      }
      async format(input2 = this.value) {
        let initial = await this.resolve(this.initial, this.state);
        if (!this.state.submitted) {
          return placeholder(this, { input: input2, initial, pos: this.cursor });
        }
        return this.styles.submitted(input2 || initial);
      }
      async render() {
        let size = this.state.size;
        let prefix = await this.prefix();
        let separator = await this.separator();
        let message2 = await this.message();
        let prompt = [prefix, message2, separator].filter(Boolean).join(" ");
        this.state.prompt = prompt;
        let header = await this.header();
        let output2 = await this.format();
        let help = await this.error() || await this.hint();
        let footer = await this.footer();
        if (help && !output2.includes(help)) output2 += " " + help;
        prompt += " " + output2;
        this.clear(size);
        this.write([header, prompt, footer].filter(Boolean).join("\n"));
        this.restore();
      }
    };
    module2.exports = StringPrompt;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/completer.js
var require_completer = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/completer.js"(exports2, module2) {
    "use strict";
    var unique = (arr) => arr.filter((v, i) => arr.lastIndexOf(v) === i);
    var compact = (arr) => unique(arr).filter(Boolean);
    module2.exports = (action, data = {}, value = "") => {
      let { past = [], present = "" } = data;
      let rest, prev;
      switch (action) {
        case "prev":
        case "undo":
          rest = past.slice(0, past.length - 1);
          prev = past[past.length - 1] || "";
          return {
            past: compact([value, ...rest]),
            present: prev
          };
        case "next":
        case "redo":
          rest = past.slice(1);
          prev = past[0] || "";
          return {
            past: compact([...rest, value]),
            present: prev
          };
        case "save":
          return {
            past: compact([...past, value]),
            present: ""
          };
        case "remove":
          prev = compact(past.filter((v) => v !== value));
          present = "";
          if (prev.length) {
            present = prev.pop();
          }
          return {
            past: prev,
            present
          };
        default: {
          throw new Error(`Invalid action: "${action}"`);
        }
      }
    };
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/input.js
var require_input = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/input.js"(exports2, module2) {
    "use strict";
    var Prompt = require_string();
    var completer = require_completer();
    var Input2 = class extends Prompt {
      constructor(options) {
        super(options);
        let history = this.options.history;
        if (history && history.store) {
          let initial = history.values || this.initial;
          this.autosave = !!history.autosave;
          this.store = history.store;
          this.data = this.store.get("values") || { past: [], present: initial };
          this.initial = this.data.present || this.data.past[this.data.past.length - 1];
        }
      }
      completion(action) {
        if (!this.store) return this.alert();
        this.data = completer(action, this.data, this.input);
        if (!this.data.present) return this.alert();
        this.input = this.data.present;
        this.cursor = this.input.length;
        return this.render();
      }
      altUp() {
        return this.completion("prev");
      }
      altDown() {
        return this.completion("next");
      }
      prev() {
        this.save();
        return super.prev();
      }
      save() {
        if (!this.store) return;
        this.data = completer("save", this.data, this.input);
        this.store.set("values", this.data);
      }
      submit() {
        if (this.store && this.autosave === true) {
          this.save();
        }
        return super.submit();
      }
    };
    module2.exports = Input2;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/invisible.js
var require_invisible = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/invisible.js"(exports2, module2) {
    "use strict";
    var StringPrompt = require_string();
    var InvisiblePrompt = class extends StringPrompt {
      format() {
        return "";
      }
    };
    module2.exports = InvisiblePrompt;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/list.js
var require_list = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/list.js"(exports2, module2) {
    "use strict";
    var StringPrompt = require_string();
    var ListPrompt = class extends StringPrompt {
      constructor(options = {}) {
        super(options);
        this.sep = this.options.separator || /, */;
        this.initial = options.initial || "";
      }
      split(input2 = this.value) {
        return input2 ? String(input2).split(this.sep) : [];
      }
      format() {
        let style = this.state.submitted ? this.styles.primary : (val) => val;
        return this.list.map(style).join(", ");
      }
      async submit(value) {
        let result = this.state.error || await this.validate(this.list, this.state);
        if (result !== true) {
          this.state.error = result;
          return super.submit();
        }
        this.value = this.list;
        return super.submit();
      }
      get list() {
        return this.split();
      }
    };
    module2.exports = ListPrompt;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/multiselect.js
var require_multiselect = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/multiselect.js"(exports2, module2) {
    "use strict";
    var Select2 = require_select();
    var MultiSelect = class extends Select2 {
      constructor(options) {
        super({ ...options, multiple: true });
      }
    };
    module2.exports = MultiSelect;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/types/number.js
var require_number = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/types/number.js"(exports2, module2) {
    "use strict";
    var StringPrompt = require_string();
    var NumberPrompt = class extends StringPrompt {
      constructor(options = {}) {
        super({ style: "number", ...options });
        this.min = this.isValue(options.min) ? this.toNumber(options.min) : -Infinity;
        this.max = this.isValue(options.max) ? this.toNumber(options.max) : Infinity;
        this.delay = options.delay != null ? options.delay : 1e3;
        this.float = options.float !== false;
        this.round = options.round === true || options.float === false;
        this.major = options.major || 10;
        this.minor = options.minor || 1;
        this.initial = options.initial != null ? options.initial : "";
        this.input = String(this.initial);
        this.cursor = this.input.length;
        this.cursorShow();
      }
      append(ch) {
        if (!/[-+.]/.test(ch) || ch === "." && this.input.includes(".")) {
          return this.alert("invalid number");
        }
        return super.append(ch);
      }
      number(ch) {
        return super.append(ch);
      }
      next() {
        if (this.input && this.input !== this.initial) return this.alert();
        if (!this.isValue(this.initial)) return this.alert();
        this.input = this.initial;
        this.cursor = String(this.initial).length;
        return this.render();
      }
      up(number) {
        let step = number || this.minor;
        let num = this.toNumber(this.input);
        if (num > this.max + step) return this.alert();
        this.input = `${num + step}`;
        return this.render();
      }
      down(number) {
        let step = number || this.minor;
        let num = this.toNumber(this.input);
        if (num < this.min - step) return this.alert();
        this.input = `${num - step}`;
        return this.render();
      }
      shiftDown() {
        return this.down(this.major);
      }
      shiftUp() {
        return this.up(this.major);
      }
      format(input2 = this.input) {
        if (typeof this.options.format === "function") {
          return this.options.format.call(this, input2);
        }
        return this.styles.info(input2);
      }
      toNumber(value = "") {
        return this.float ? +value : Math.round(+value);
      }
      isValue(value) {
        return /^[-+]?[0-9]+((\.)|(\.[0-9]+))?$/.test(value);
      }
      submit() {
        let value = [this.input, this.initial].find((v) => this.isValue(v));
        this.value = this.toNumber(value || 0);
        return super.submit();
      }
    };
    module2.exports = NumberPrompt;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/numeral.js
var require_numeral = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/numeral.js"(exports2, module2) {
    module2.exports = require_number();
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/password.js
var require_password = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/password.js"(exports2, module2) {
    "use strict";
    var StringPrompt = require_string();
    var PasswordPrompt = class extends StringPrompt {
      constructor(options) {
        super(options);
        this.cursorShow();
      }
      format(input2 = this.input) {
        if (!this.keypressed) return "";
        let color = this.state.submitted ? this.styles.primary : this.styles.muted;
        return color(this.symbols.asterisk.repeat(input2.length));
      }
    };
    module2.exports = PasswordPrompt;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/scale.js
var require_scale = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/scale.js"(exports2, module2) {
    "use strict";
    var stripAnsi2 = require_strip_ansi();
    var ArrayPrompt = require_array();
    var utils = require_utils();
    var LikertScale = class extends ArrayPrompt {
      constructor(options = {}) {
        super(options);
        this.widths = [].concat(options.messageWidth || 50);
        this.align = [].concat(options.align || "left");
        this.linebreak = options.linebreak || false;
        this.edgeLength = options.edgeLength || 3;
        this.newline = options.newline || "\n   ";
        let start = options.startNumber || 1;
        if (typeof this.scale === "number") {
          this.scaleKey = false;
          this.scale = Array(this.scale).fill(0).map((v, i) => ({ name: i + start }));
        }
      }
      async reset() {
        this.tableized = false;
        await super.reset();
        return this.render();
      }
      tableize() {
        if (this.tableized === true) return;
        this.tableized = true;
        let longest = 0;
        for (let ch of this.choices) {
          longest = Math.max(longest, ch.message.length);
          ch.scaleIndex = ch.initial || 2;
          ch.scale = [];
          for (let i = 0; i < this.scale.length; i++) {
            ch.scale.push({ index: i });
          }
        }
        this.widths[0] = Math.min(this.widths[0], longest + 3);
      }
      async dispatch(s, key) {
        if (this.multiple) {
          return this[key.name] ? await this[key.name](s, key) : await super.dispatch(s, key);
        }
        this.alert();
      }
      heading(msg, item, i) {
        return this.styles.strong(msg);
      }
      separator() {
        return this.styles.muted(this.symbols.ellipsis);
      }
      right() {
        let choice = this.focused;
        if (choice.scaleIndex >= this.scale.length - 1) return this.alert();
        choice.scaleIndex++;
        return this.render();
      }
      left() {
        let choice = this.focused;
        if (choice.scaleIndex <= 0) return this.alert();
        choice.scaleIndex--;
        return this.render();
      }
      indent() {
        return "";
      }
      format() {
        if (this.state.submitted) {
          let values = this.choices.map((ch) => this.styles.info(ch.index));
          return values.join(", ");
        }
        return "";
      }
      pointer() {
        return "";
      }
      /**
       * Render the scale "Key". Something like:
       * @return {String}
       */
      renderScaleKey() {
        if (this.scaleKey === false) return "";
        if (this.state.submitted) return "";
        let scale = this.scale.map((item) => `   ${item.name} - ${item.message}`);
        let key = ["", ...scale].map((item) => this.styles.muted(item));
        return key.join("\n");
      }
      /**
       * Render the heading row for the scale.
       * @return {String}
       */
      renderScaleHeading(max) {
        let keys = this.scale.map((ele) => ele.name);
        if (typeof this.options.renderScaleHeading === "function") {
          keys = this.options.renderScaleHeading.call(this, max);
        }
        let diff = this.scaleLength - keys.join("").length;
        let spacing = Math.round(diff / (keys.length - 1));
        let names = keys.map((key) => this.styles.strong(key));
        let headings = names.join(" ".repeat(spacing));
        let padding = " ".repeat(this.widths[0]);
        return this.margin[3] + padding + this.margin[1] + headings;
      }
      /**
       * Render a scale indicator => ◯ or ◉ by default
       */
      scaleIndicator(choice, item, i) {
        if (typeof this.options.scaleIndicator === "function") {
          return this.options.scaleIndicator.call(this, choice, item, i);
        }
        let enabled = choice.scaleIndex === item.index;
        if (item.disabled) return this.styles.hint(this.symbols.radio.disabled);
        if (enabled) return this.styles.success(this.symbols.radio.on);
        return this.symbols.radio.off;
      }
      /**
       * Render the actual scale => ◯────◯────◉────◯────◯
       */
      renderScale(choice, i) {
        let scale = choice.scale.map((item) => this.scaleIndicator(choice, item, i));
        let padding = this.term === "Hyper" ? "" : " ";
        return scale.join(padding + this.symbols.line.repeat(this.edgeLength));
      }
      /**
       * Render a choice, including scale =>
       *   "The website is easy to navigate. ◯───◯───◉───◯───◯"
       */
      async renderChoice(choice, i) {
        await this.onChoice(choice, i);
        let focused = this.index === i;
        let pointer = await this.pointer(choice, i);
        let hint = await choice.hint;
        if (hint && !utils.hasColor(hint)) {
          hint = this.styles.muted(hint);
        }
        let pad = (str) => this.margin[3] + str.replace(/\s+$/, "").padEnd(this.widths[0], " ");
        let newline = this.newline;
        let ind = this.indent(choice);
        let message2 = await this.resolve(choice.message, this.state, choice, i);
        let scale = await this.renderScale(choice, i);
        let margin = this.margin[1] + this.margin[3];
        this.scaleLength = stripAnsi2(scale).length;
        this.widths[0] = Math.min(this.widths[0], this.width - this.scaleLength - margin.length);
        let msg = utils.wordWrap(message2, { width: this.widths[0], newline });
        let lines = msg.split("\n").map((line) => pad(line) + this.margin[1]);
        if (focused) {
          scale = this.styles.info(scale);
          lines = lines.map((line) => this.styles.info(line));
        }
        lines[0] += scale;
        if (this.linebreak) lines.push("");
        return [ind + pointer, lines.join("\n")].filter(Boolean);
      }
      async renderChoices() {
        if (this.state.submitted) return "";
        this.tableize();
        let choices = this.visible.map(async (ch, i) => await this.renderChoice(ch, i));
        let visible = await Promise.all(choices);
        let heading = await this.renderScaleHeading();
        return this.margin[0] + [heading, ...visible.map((v) => v.join(" "))].join("\n");
      }
      async render() {
        let { submitted, size } = this.state;
        let prefix = await this.prefix();
        let separator = await this.separator();
        let message2 = await this.message();
        let prompt = "";
        if (this.options.promptLine !== false) {
          prompt = [prefix, message2, separator, ""].join(" ");
          this.state.prompt = prompt;
        }
        let header = await this.header();
        let output2 = await this.format();
        let key = await this.renderScaleKey();
        let help = await this.error() || await this.hint();
        let body = await this.renderChoices();
        let footer = await this.footer();
        let err = this.emptyError;
        if (output2) prompt += output2;
        if (help && !prompt.includes(help)) prompt += " " + help;
        if (submitted && !output2 && !body.trim() && this.multiple && err != null) {
          prompt += this.styles.danger(err);
        }
        this.clear(size);
        this.write([header, prompt, key, body, footer].filter(Boolean).join("\n"));
        if (!this.state.submitted) {
          this.write(this.margin[2]);
        }
        this.restore();
      }
      submit() {
        this.value = {};
        for (let choice of this.choices) {
          this.value[choice.name] = choice.scaleIndex;
        }
        return this.base.submit.call(this);
      }
    };
    module2.exports = LikertScale;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/interpolate.js
var require_interpolate = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/interpolate.js"(exports2, module2) {
    "use strict";
    var stripAnsi2 = require_strip_ansi();
    var clean = (str = "") => {
      return typeof str === "string" ? str.replace(/^['"]|['"]$/g, "") : "";
    };
    var Item = class {
      constructor(token) {
        this.name = token.key;
        this.field = token.field || {};
        this.value = clean(token.initial || this.field.initial || "");
        this.message = token.message || this.name;
        this.cursor = 0;
        this.input = "";
        this.lines = [];
      }
    };
    var tokenize = async (options = {}, defaults = {}, fn = (token) => token) => {
      let unique = /* @__PURE__ */ new Set();
      let fields = options.fields || [];
      let input2 = options.template;
      let tabstops = [];
      let items = [];
      let keys = [];
      let line = 1;
      if (typeof input2 === "function") {
        input2 = await input2();
      }
      let i = -1;
      let next = () => input2[++i];
      let peek = () => input2[i + 1];
      let push = (token) => {
        token.line = line;
        tabstops.push(token);
      };
      push({ type: "bos", value: "" });
      while (i < input2.length - 1) {
        let value = next();
        if (/^[^\S\n ]$/.test(value)) {
          push({ type: "text", value });
          continue;
        }
        if (value === "\n") {
          push({ type: "newline", value });
          line++;
          continue;
        }
        if (value === "\\") {
          value += next();
          push({ type: "text", value });
          continue;
        }
        if ((value === "$" || value === "#" || value === "{") && peek() === "{") {
          let n = next();
          value += n;
          let token = { type: "template", open: value, inner: "", close: "", value };
          let ch;
          while (ch = next()) {
            if (ch === "}") {
              if (peek() === "}") ch += next();
              token.value += ch;
              token.close = ch;
              break;
            }
            if (ch === ":") {
              token.initial = "";
              token.key = token.inner;
            } else if (token.initial !== void 0) {
              token.initial += ch;
            }
            token.value += ch;
            token.inner += ch;
          }
          token.template = token.open + (token.initial || token.inner) + token.close;
          token.key = token.key || token.inner;
          if (hasOwnProperty.call(defaults, token.key)) {
            token.initial = defaults[token.key];
          }
          token = fn(token);
          push(token);
          keys.push(token.key);
          unique.add(token.key);
          let item = items.find((item2) => item2.name === token.key);
          token.field = fields.find((ch2) => ch2.name === token.key);
          if (!item) {
            item = new Item(token);
            items.push(item);
          }
          item.lines.push(token.line - 1);
          continue;
        }
        let last = tabstops[tabstops.length - 1];
        if (last.type === "text" && last.line === line) {
          last.value += value;
        } else {
          push({ type: "text", value });
        }
      }
      push({ type: "eos", value: "" });
      return { input: input2, tabstops, unique, keys, items };
    };
    module2.exports = async (prompt) => {
      let options = prompt.options;
      let required = new Set(options.required === true ? [] : options.required || []);
      let defaults = { ...options.values, ...options.initial };
      let { tabstops, items, keys } = await tokenize(options, defaults);
      let result = createFn("result", prompt, options);
      let format2 = createFn("format", prompt, options);
      let isValid = createFn("validate", prompt, options, true);
      let isVal = prompt.isValue.bind(prompt);
      return async (state = {}, submitted = false) => {
        let index = 0;
        state.required = required;
        state.items = items;
        state.keys = keys;
        state.output = "";
        let validate2 = async (value, state2, item, index2) => {
          let error3 = await isValid(value, state2, item, index2);
          if (error3 === false) {
            return "Invalid field " + item.name;
          }
          return error3;
        };
        for (let token of tabstops) {
          let value = token.value;
          let key = token.key;
          if (token.type !== "template") {
            if (value) state.output += value;
            continue;
          }
          if (token.type === "template") {
            let item = items.find((ch) => ch.name === key);
            if (options.required === true) {
              state.required.add(item.name);
            }
            let val = [item.input, state.values[item.value], item.value, value].find(isVal);
            let field = item.field || {};
            let message2 = field.message || token.inner;
            if (submitted) {
              let error3 = await validate2(state.values[key], state, item, index);
              if (error3 && typeof error3 === "string" || error3 === false) {
                state.invalid.set(key, error3);
                continue;
              }
              state.invalid.delete(key);
              let res = await result(state.values[key], state, item, index);
              state.output += stripAnsi2(res);
              continue;
            }
            item.placeholder = false;
            let before = value;
            value = await format2(value, state, item, index);
            if (val !== value) {
              state.values[key] = val;
              value = prompt.styles.typing(val);
              state.missing.delete(message2);
            } else {
              state.values[key] = void 0;
              val = `<${message2}>`;
              value = prompt.styles.primary(val);
              item.placeholder = true;
              if (state.required.has(key)) {
                state.missing.add(message2);
              }
            }
            if (state.missing.has(message2) && state.validating) {
              value = prompt.styles.warning(val);
            }
            if (state.invalid.has(key) && state.validating) {
              value = prompt.styles.danger(val);
            }
            if (index === state.index) {
              if (before !== value) {
                value = prompt.styles.underline(value);
              } else {
                value = prompt.styles.heading(stripAnsi2(value));
              }
            }
            index++;
          }
          if (value) {
            state.output += value;
          }
        }
        let lines = state.output.split("\n").map((l) => " " + l);
        let len = items.length;
        let done = 0;
        for (let item of items) {
          if (state.invalid.has(item.name)) {
            item.lines.forEach((i) => {
              if (lines[i][0] !== " ") return;
              lines[i] = state.styles.danger(state.symbols.bullet) + lines[i].slice(1);
            });
          }
          if (prompt.isValue(state.values[item.name])) {
            done++;
          }
        }
        state.completed = (done / len * 100).toFixed(0);
        state.output = lines.join("\n");
        return state.output;
      };
    };
    function createFn(prop, prompt, options, fallback) {
      return (value, state, item, index) => {
        if (typeof item.field[prop] === "function") {
          return item.field[prop].call(prompt, value, state, item, index);
        }
        return [fallback, value].find((v) => prompt.isValue(v));
      };
    }
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/snippet.js
var require_snippet = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/snippet.js"(exports2, module2) {
    "use strict";
    var stripAnsi2 = require_strip_ansi();
    var interpolate = require_interpolate();
    var Prompt = require_prompt();
    var SnippetPrompt = class extends Prompt {
      constructor(options) {
        super(options);
        this.cursorHide();
        this.reset(true);
      }
      async initialize() {
        this.interpolate = await interpolate(this);
        await super.initialize();
      }
      async reset(first) {
        this.state.keys = [];
        this.state.invalid = /* @__PURE__ */ new Map();
        this.state.missing = /* @__PURE__ */ new Set();
        this.state.completed = 0;
        this.state.values = {};
        if (first !== true) {
          await this.initialize();
          await this.render();
        }
      }
      moveCursor(n) {
        let item = this.getItem();
        this.cursor += n;
        item.cursor += n;
      }
      dispatch(ch, key) {
        if (!key.code && !key.ctrl && ch != null && this.getItem()) {
          this.append(ch, key);
          return;
        }
        this.alert();
      }
      append(ch, key) {
        let item = this.getItem();
        let prefix = item.input.slice(0, this.cursor);
        let suffix = item.input.slice(this.cursor);
        this.input = item.input = `${prefix}${ch}${suffix}`;
        this.moveCursor(1);
        this.render();
      }
      delete() {
        let item = this.getItem();
        if (this.cursor <= 0 || !item.input) return this.alert();
        let suffix = item.input.slice(this.cursor);
        let prefix = item.input.slice(0, this.cursor - 1);
        this.input = item.input = `${prefix}${suffix}`;
        this.moveCursor(-1);
        this.render();
      }
      increment(i) {
        return i >= this.state.keys.length - 1 ? 0 : i + 1;
      }
      decrement(i) {
        return i <= 0 ? this.state.keys.length - 1 : i - 1;
      }
      first() {
        this.state.index = 0;
        this.render();
      }
      last() {
        this.state.index = this.state.keys.length - 1;
        this.render();
      }
      right() {
        if (this.cursor >= this.input.length) return this.alert();
        this.moveCursor(1);
        this.render();
      }
      left() {
        if (this.cursor <= 0) return this.alert();
        this.moveCursor(-1);
        this.render();
      }
      prev() {
        this.state.index = this.decrement(this.state.index);
        this.getItem();
        this.render();
      }
      next() {
        this.state.index = this.increment(this.state.index);
        this.getItem();
        this.render();
      }
      up() {
        this.prev();
      }
      down() {
        this.next();
      }
      format(value) {
        let color = this.state.completed < 100 ? this.styles.warning : this.styles.success;
        if (this.state.submitted === true && this.state.completed !== 100) {
          color = this.styles.danger;
        }
        return color(`${this.state.completed}% completed`);
      }
      async render() {
        let { index, keys = [], submitted, size } = this.state;
        let newline = [this.options.newline, "\n"].find((v) => v != null);
        let prefix = await this.prefix();
        let separator = await this.separator();
        let message2 = await this.message();
        let prompt = [prefix, message2, separator].filter(Boolean).join(" ");
        this.state.prompt = prompt;
        let header = await this.header();
        let error3 = await this.error() || "";
        let hint = await this.hint() || "";
        let body = submitted ? "" : await this.interpolate(this.state);
        let key = this.state.key = keys[index] || "";
        let input2 = await this.format(key);
        let footer = await this.footer();
        if (input2) prompt += " " + input2;
        if (hint && !input2 && this.state.completed === 0) prompt += " " + hint;
        this.clear(size);
        let lines = [header, prompt, body, footer, error3.trim()];
        this.write(lines.filter(Boolean).join(newline));
        this.restore();
      }
      getItem(name) {
        let { items, keys, index } = this.state;
        let item = items.find((ch) => ch.name === keys[index]);
        if (item && item.input != null) {
          this.input = item.input;
          this.cursor = item.cursor;
        }
        return item;
      }
      async submit() {
        if (typeof this.interpolate !== "function") await this.initialize();
        await this.interpolate(this.state, true);
        let { invalid, missing, output: output2, values } = this.state;
        if (invalid.size) {
          let err = "";
          for (let [key, value] of invalid) err += `Invalid ${key}: ${value}
`;
          this.state.error = err;
          return super.submit();
        }
        if (missing.size) {
          this.state.error = "Required: " + [...missing.keys()].join(", ");
          return super.submit();
        }
        let lines = stripAnsi2(output2).split("\n");
        let result = lines.map((v) => v.slice(1)).join("\n");
        this.value = { values, result };
        return super.submit();
      }
    };
    module2.exports = SnippetPrompt;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/sort.js
var require_sort = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/sort.js"(exports2, module2) {
    "use strict";
    var hint = "(Use <shift>+<up/down> to sort)";
    var Prompt = require_select();
    var Sort = class extends Prompt {
      constructor(options) {
        super({ ...options, reorder: false, sort: true, multiple: true });
        this.state.hint = [this.options.hint, hint].find(this.isValue.bind(this));
      }
      indicator() {
        return "";
      }
      async renderChoice(choice, i) {
        let str = await super.renderChoice(choice, i);
        let sym = this.symbols.identicalTo + " ";
        let pre = this.index === i && this.sorting ? this.styles.muted(sym) : "  ";
        if (this.options.drag === false) pre = "";
        if (this.options.numbered === true) {
          return pre + `${i + 1} - ` + str;
        }
        return pre + str;
      }
      get selected() {
        return this.choices;
      }
      submit() {
        this.value = this.choices.map((choice) => choice.value);
        return super.submit();
      }
    };
    module2.exports = Sort;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/survey.js
var require_survey = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/survey.js"(exports2, module2) {
    "use strict";
    var ArrayPrompt = require_array();
    var Survey = class extends ArrayPrompt {
      constructor(options = {}) {
        super(options);
        this.emptyError = options.emptyError || "No items were selected";
        this.term = process.env.TERM_PROGRAM;
        if (!this.options.header) {
          let header = ["", "4 - Strongly Agree", "3 - Agree", "2 - Neutral", "1 - Disagree", "0 - Strongly Disagree", ""];
          header = header.map((ele) => this.styles.muted(ele));
          this.state.header = header.join("\n   ");
        }
      }
      async toChoices(...args) {
        if (this.createdScales) return false;
        this.createdScales = true;
        let choices = await super.toChoices(...args);
        for (let choice of choices) {
          choice.scale = createScale(5, this.options);
          choice.scaleIdx = 2;
        }
        return choices;
      }
      dispatch() {
        this.alert();
      }
      space() {
        let choice = this.focused;
        let ele = choice.scale[choice.scaleIdx];
        let selected = ele.selected;
        choice.scale.forEach((e) => e.selected = false);
        ele.selected = !selected;
        return this.render();
      }
      indicator() {
        return "";
      }
      pointer() {
        return "";
      }
      separator() {
        return this.styles.muted(this.symbols.ellipsis);
      }
      right() {
        let choice = this.focused;
        if (choice.scaleIdx >= choice.scale.length - 1) return this.alert();
        choice.scaleIdx++;
        return this.render();
      }
      left() {
        let choice = this.focused;
        if (choice.scaleIdx <= 0) return this.alert();
        choice.scaleIdx--;
        return this.render();
      }
      indent() {
        return "   ";
      }
      async renderChoice(item, i) {
        await this.onChoice(item, i);
        let focused = this.index === i;
        let isHyper = this.term === "Hyper";
        let n = !isHyper ? 8 : 9;
        let s = !isHyper ? " " : "";
        let ln = this.symbols.line.repeat(n);
        let sp = " ".repeat(n + (isHyper ? 0 : 1));
        let dot = (enabled) => (enabled ? this.styles.success("\u25C9") : "\u25EF") + s;
        let num = i + 1 + ".";
        let color = focused ? this.styles.heading : this.styles.noop;
        let msg = await this.resolve(item.message, this.state, item, i);
        let indent = this.indent(item);
        let scale = indent + item.scale.map((e, i2) => dot(i2 === item.scaleIdx)).join(ln);
        let val = (i2) => i2 === item.scaleIdx ? color(i2) : i2;
        let next = indent + item.scale.map((e, i2) => val(i2)).join(sp);
        let line = () => [num, msg].filter(Boolean).join(" ");
        let lines = () => [line(), scale, next, " "].filter(Boolean).join("\n");
        if (focused) {
          scale = this.styles.cyan(scale);
          next = this.styles.cyan(next);
        }
        return lines();
      }
      async renderChoices() {
        if (this.state.submitted) return "";
        let choices = this.visible.map(async (ch, i) => await this.renderChoice(ch, i));
        let visible = await Promise.all(choices);
        if (!visible.length) visible.push(this.styles.danger("No matching choices"));
        return visible.join("\n");
      }
      format() {
        if (this.state.submitted) {
          let values = this.choices.map((ch) => this.styles.info(ch.scaleIdx));
          return values.join(", ");
        }
        return "";
      }
      async render() {
        let { submitted, size } = this.state;
        let prefix = await this.prefix();
        let separator = await this.separator();
        let message2 = await this.message();
        let prompt = [prefix, message2, separator].filter(Boolean).join(" ");
        this.state.prompt = prompt;
        let header = await this.header();
        let output2 = await this.format();
        let help = await this.error() || await this.hint();
        let body = await this.renderChoices();
        let footer = await this.footer();
        if (output2 || !help) prompt += " " + output2;
        if (help && !prompt.includes(help)) prompt += " " + help;
        if (submitted && !output2 && !body && this.multiple && this.type !== "form") {
          prompt += this.styles.danger(this.emptyError);
        }
        this.clear(size);
        this.write([prompt, header, body, footer].filter(Boolean).join("\n"));
        this.restore();
      }
      submit() {
        this.value = {};
        for (let choice of this.choices) {
          this.value[choice.name] = choice.scaleIdx;
        }
        return this.base.submit.call(this);
      }
    };
    function createScale(n, options = {}) {
      if (Array.isArray(options.scale)) {
        return options.scale.map((ele) => ({ ...ele }));
      }
      let scale = [];
      for (let i = 1; i < n + 1; i++) scale.push({ i, selected: false });
      return scale;
    }
    module2.exports = Survey;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/text.js
var require_text = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/text.js"(exports2, module2) {
    module2.exports = require_input();
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/toggle.js
var require_toggle = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/toggle.js"(exports2, module2) {
    "use strict";
    var BooleanPrompt = require_boolean();
    var TogglePrompt = class extends BooleanPrompt {
      async initialize() {
        await super.initialize();
        this.value = this.initial = this.resolve(this.options.initial);
        this.disabled = this.options.disabled || "no";
        this.enabled = this.options.enabled || "yes";
        await this.render();
      }
      reset() {
        this.value = this.initial;
        this.render();
      }
      delete() {
        this.alert();
      }
      toggle() {
        this.value = !this.value;
        this.render();
      }
      enable() {
        if (this.value === true) return this.alert();
        this.value = true;
        this.render();
      }
      disable() {
        if (this.value === false) return this.alert();
        this.value = false;
        this.render();
      }
      up() {
        this.toggle();
      }
      down() {
        this.toggle();
      }
      right() {
        this.toggle();
      }
      left() {
        this.toggle();
      }
      next() {
        this.toggle();
      }
      prev() {
        this.toggle();
      }
      dispatch(ch = "", key) {
        switch (ch.toLowerCase()) {
          case " ":
            return this.toggle();
          case "1":
          case "y":
          case "t":
            return this.enable();
          case "0":
          case "n":
          case "f":
            return this.disable();
          default: {
            return this.alert();
          }
        }
      }
      format() {
        let active = (str) => this.styles.primary.underline(str);
        let value = [
          this.value ? this.disabled : active(this.disabled),
          this.value ? active(this.enabled) : this.enabled
        ];
        return value.join(this.styles.muted(" / "));
      }
      async render() {
        let { size } = this.state;
        let header = await this.header();
        let prefix = await this.prefix();
        let separator = await this.separator();
        let message2 = await this.message();
        let output2 = await this.format();
        let help = await this.error() || await this.hint();
        let footer = await this.footer();
        let prompt = [prefix, message2, separator, output2].join(" ");
        this.state.prompt = prompt;
        if (help && !prompt.includes(help)) prompt += " " + help;
        this.clear(size);
        this.write([header, prompt, footer].filter(Boolean).join("\n"));
        this.write(this.margin[2]);
        this.restore();
      }
    };
    module2.exports = TogglePrompt;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/quiz.js
var require_quiz = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/quiz.js"(exports2, module2) {
    "use strict";
    var SelectPrompt = require_select();
    var Quiz = class extends SelectPrompt {
      constructor(options) {
        super(options);
        if (typeof this.options.correctChoice !== "number" || this.options.correctChoice < 0) {
          throw new Error("Please specify the index of the correct answer from the list of choices");
        }
      }
      async toChoices(value, parent) {
        let choices = await super.toChoices(value, parent);
        if (choices.length < 2) {
          throw new Error("Please give at least two choices to the user");
        }
        if (this.options.correctChoice > choices.length) {
          throw new Error("Please specify the index of the correct answer from the list of choices");
        }
        return choices;
      }
      check(state) {
        return state.index === this.options.correctChoice;
      }
      async result(selected) {
        return {
          selectedAnswer: selected,
          correctAnswer: this.options.choices[this.options.correctChoice].value,
          correct: await this.check(this.state)
        };
      }
    };
    module2.exports = Quiz;
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/index.js
var require_prompts = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/prompts/index.js"(exports2) {
    "use strict";
    var utils = require_utils();
    var define = (key, fn) => {
      utils.defineExport(exports2, key, fn);
      utils.defineExport(exports2, key.toLowerCase(), fn);
    };
    define("AutoComplete", () => require_autocomplete());
    define("BasicAuth", () => require_basicauth());
    define("Confirm", () => require_confirm());
    define("Editable", () => require_editable());
    define("Form", () => require_form());
    define("Input", () => require_input());
    define("Invisible", () => require_invisible());
    define("List", () => require_list());
    define("MultiSelect", () => require_multiselect());
    define("Numeral", () => require_numeral());
    define("Password", () => require_password());
    define("Scale", () => require_scale());
    define("Select", () => require_select());
    define("Snippet", () => require_snippet());
    define("Sort", () => require_sort());
    define("Survey", () => require_survey());
    define("Text", () => require_text());
    define("Toggle", () => require_toggle());
    define("Quiz", () => require_quiz());
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/types/index.js
var require_types = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/lib/types/index.js"(exports2, module2) {
    module2.exports = {
      ArrayPrompt: require_array(),
      AuthPrompt: require_auth(),
      BooleanPrompt: require_boolean(),
      NumberPrompt: require_number(),
      StringPrompt: require_string()
    };
  }
});

// node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/index.js
var require_enquirer = __commonJS({
  "node_modules/.pnpm/enquirer@2.4.1/node_modules/enquirer/index.js"(exports2, module2) {
    "use strict";
    var assert = require("assert");
    var Events = require("events");
    var utils = require_utils();
    var Enquirer = class extends Events {
      constructor(options, answers) {
        super();
        this.options = utils.merge({}, options);
        this.answers = { ...answers };
      }
      /**
       * Register a custom prompt type.
       *
       * ```js
       * const Enquirer = require('enquirer');
       * const enquirer = new Enquirer();
       * enquirer.register('customType', require('./custom-prompt'));
       * ```
       * @name register()
       * @param {String} `type`
       * @param {Function|Prompt} `fn` `Prompt` class, or a function that returns a `Prompt` class.
       * @return {Object} Returns the Enquirer instance
       * @api public
       */
      register(type, fn) {
        if (utils.isObject(type)) {
          for (let key of Object.keys(type)) this.register(key, type[key]);
          return this;
        }
        assert.equal(typeof fn, "function", "expected a function");
        const name = type.toLowerCase();
        if (fn.prototype instanceof this.Prompt) {
          this.prompts[name] = fn;
        } else {
          this.prompts[name] = fn(this.Prompt, this);
        }
        return this;
      }
      /**
       * Prompt function that takes a "question" object or array of question objects,
       * and returns an object with responses from the user.
       *
       * ```js
       * const Enquirer = require('enquirer');
       * const enquirer = new Enquirer();
       *
       * const response = await enquirer.prompt({
       *   type: 'input',
       *   name: 'username',
       *   message: 'What is your username?'
       * });
       * console.log(response);
       * ```
       * @name prompt()
       * @param {Array|Object} `questions` Options objects for one or more prompts to run.
       * @return {Promise} Promise that returns an "answers" object with the user's responses.
       * @api public
       */
      async prompt(questions = []) {
        for (let question of [].concat(questions)) {
          try {
            if (typeof question === "function") question = await question.call(this);
            await this.ask(utils.merge({}, this.options, question));
          } catch (err) {
            return Promise.reject(err);
          }
        }
        return this.answers;
      }
      async ask(question) {
        if (typeof question === "function") {
          question = await question.call(this);
        }
        let opts = utils.merge({}, this.options, question);
        let { type, name } = question;
        let { set, get } = utils;
        if (typeof type === "function") {
          type = await type.call(this, question, this.answers);
        }
        if (!type) return this.answers[name];
        if (type === "number") type = "numeral";
        assert(this.prompts[type], `Prompt "${type}" is not registered`);
        let prompt = new this.prompts[type](opts);
        let value = get(this.answers, name);
        prompt.state.answers = this.answers;
        prompt.enquirer = this;
        if (name) {
          prompt.on("submit", (value2) => {
            this.emit("answer", name, value2, prompt);
            set(this.answers, name, value2);
          });
        }
        let emit = prompt.emit.bind(prompt);
        prompt.emit = (...args) => {
          this.emit.call(this, ...args);
          return emit(...args);
        };
        this.emit("prompt", prompt, this);
        if (opts.autofill && value != null) {
          prompt.value = prompt.input = value;
          if (opts.autofill === "show") {
            await prompt.submit();
          }
        } else {
          value = prompt.value = await prompt.run();
        }
        return value;
      }
      /**
       * Use an enquirer plugin.
       *
       * ```js
       * const Enquirer = require('enquirer');
       * const enquirer = new Enquirer();
       * const plugin = enquirer => {
       *   // do stuff to enquire instance
       * };
       * enquirer.use(plugin);
       * ```
       * @name use()
       * @param {Function} `plugin` Plugin function that takes an instance of Enquirer.
       * @return {Object} Returns the Enquirer instance.
       * @api public
       */
      use(plugin) {
        plugin.call(this, this);
        return this;
      }
      set Prompt(value) {
        this._Prompt = value;
      }
      get Prompt() {
        return this._Prompt || this.constructor.Prompt;
      }
      get prompts() {
        return this.constructor.prompts;
      }
      static set Prompt(value) {
        this._Prompt = value;
      }
      static get Prompt() {
        return this._Prompt || require_prompt();
      }
      static get prompts() {
        return require_prompts();
      }
      static get types() {
        return require_types();
      }
      /**
       * Prompt function that takes a "question" object or array of question objects,
       * and returns an object with responses from the user.
       *
       * ```js
       * const { prompt } = require('enquirer');
       * const response = await prompt({
       *   type: 'input',
       *   name: 'username',
       *   message: 'What is your username?'
       * });
       * console.log(response);
       * ```
       * @name Enquirer#prompt
       * @param {Array|Object} `questions` Options objects for one or more prompts to run.
       * @return {Promise} Promise that returns an "answers" object with the user's responses.
       * @api public
       */
      static get prompt() {
        const fn = (questions, ...rest) => {
          let enquirer2 = new this(...rest);
          let emit = enquirer2.emit.bind(enquirer2);
          enquirer2.emit = (...args) => {
            fn.emit(...args);
            return emit(...args);
          };
          return enquirer2.prompt(questions);
        };
        utils.mixinEmitter(fn, new Events());
        return fn;
      }
    };
    utils.mixinEmitter(Enquirer, new Events());
    var prompts = Enquirer.prompts;
    for (let name of Object.keys(prompts)) {
      let key = name.toLowerCase();
      let run2 = (options) => new prompts[name](options).run();
      Enquirer.prompt[key] = run2;
      Enquirer[key] = run2;
      if (!Enquirer[name]) {
        Reflect.defineProperty(Enquirer, name, { get: () => prompts[name] });
      }
    }
    var define = (name) => {
      utils.defineExport(Enquirer, name, () => Enquirer.types[name]);
    };
    define("ArrayPrompt");
    define("AuthPrompt");
    define("BooleanPrompt");
    define("NumberPrompt");
    define("StringPrompt");
    module2.exports = Enquirer;
  }
});

// node_modules/.pnpm/boxen@8.0.1/node_modules/boxen/index.js
var import_node_process2 = __toESM(require("node:process"), 1);

// node_modules/.pnpm/ansi-regex@6.2.2/node_modules/ansi-regex/index.js
function ansiRegex({ onlyFirst = false } = {}) {
  const ST = "(?:\\u0007|\\u001B\\u005C|\\u009C)";
  const osc = `(?:\\u001B\\][\\s\\S]*?${ST})`;
  const csi = "[\\u001B\\u009B][[\\]()#;?]*(?:\\d{1,4}(?:[;:]\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]";
  const pattern = `${osc}|${csi}`;
  return new RegExp(pattern, onlyFirst ? void 0 : "g");
}

// node_modules/.pnpm/strip-ansi@7.2.0/node_modules/strip-ansi/index.js
var regex = ansiRegex();
function stripAnsi(string) {
  if (typeof string !== "string") {
    throw new TypeError(`Expected a \`string\`, got \`${typeof string}\``);
  }
  if (!string.includes("\x1B") && !string.includes("\x9B")) {
    return string;
  }
  return string.replace(regex, "");
}

// node_modules/.pnpm/get-east-asian-width@1.5.0/node_modules/get-east-asian-width/lookup-data.js
var ambiguousRanges = [161, 161, 164, 164, 167, 168, 170, 170, 173, 174, 176, 180, 182, 186, 188, 191, 198, 198, 208, 208, 215, 216, 222, 225, 230, 230, 232, 234, 236, 237, 240, 240, 242, 243, 247, 250, 252, 252, 254, 254, 257, 257, 273, 273, 275, 275, 283, 283, 294, 295, 299, 299, 305, 307, 312, 312, 319, 322, 324, 324, 328, 331, 333, 333, 338, 339, 358, 359, 363, 363, 462, 462, 464, 464, 466, 466, 468, 468, 470, 470, 472, 472, 474, 474, 476, 476, 593, 593, 609, 609, 708, 708, 711, 711, 713, 715, 717, 717, 720, 720, 728, 731, 733, 733, 735, 735, 768, 879, 913, 929, 931, 937, 945, 961, 963, 969, 1025, 1025, 1040, 1103, 1105, 1105, 8208, 8208, 8211, 8214, 8216, 8217, 8220, 8221, 8224, 8226, 8228, 8231, 8240, 8240, 8242, 8243, 8245, 8245, 8251, 8251, 8254, 8254, 8308, 8308, 8319, 8319, 8321, 8324, 8364, 8364, 8451, 8451, 8453, 8453, 8457, 8457, 8467, 8467, 8470, 8470, 8481, 8482, 8486, 8486, 8491, 8491, 8531, 8532, 8539, 8542, 8544, 8555, 8560, 8569, 8585, 8585, 8592, 8601, 8632, 8633, 8658, 8658, 8660, 8660, 8679, 8679, 8704, 8704, 8706, 8707, 8711, 8712, 8715, 8715, 8719, 8719, 8721, 8721, 8725, 8725, 8730, 8730, 8733, 8736, 8739, 8739, 8741, 8741, 8743, 8748, 8750, 8750, 8756, 8759, 8764, 8765, 8776, 8776, 8780, 8780, 8786, 8786, 8800, 8801, 8804, 8807, 8810, 8811, 8814, 8815, 8834, 8835, 8838, 8839, 8853, 8853, 8857, 8857, 8869, 8869, 8895, 8895, 8978, 8978, 9312, 9449, 9451, 9547, 9552, 9587, 9600, 9615, 9618, 9621, 9632, 9633, 9635, 9641, 9650, 9651, 9654, 9655, 9660, 9661, 9664, 9665, 9670, 9672, 9675, 9675, 9678, 9681, 9698, 9701, 9711, 9711, 9733, 9734, 9737, 9737, 9742, 9743, 9756, 9756, 9758, 9758, 9792, 9792, 9794, 9794, 9824, 9825, 9827, 9829, 9831, 9834, 9836, 9837, 9839, 9839, 9886, 9887, 9919, 9919, 9926, 9933, 9935, 9939, 9941, 9953, 9955, 9955, 9960, 9961, 9963, 9969, 9972, 9972, 9974, 9977, 9979, 9980, 9982, 9983, 10045, 10045, 10102, 10111, 11094, 11097, 12872, 12879, 57344, 63743, 65024, 65039, 65533, 65533, 127232, 127242, 127248, 127277, 127280, 127337, 127344, 127373, 127375, 127376, 127387, 127404, 917760, 917999, 983040, 1048573, 1048576, 1114109];
var fullwidthRanges = [12288, 12288, 65281, 65376, 65504, 65510];
var halfwidthRanges = [8361, 8361, 65377, 65470, 65474, 65479, 65482, 65487, 65490, 65495, 65498, 65500, 65512, 65518];
var narrowRanges = [32, 126, 162, 163, 165, 166, 172, 172, 175, 175, 10214, 10221, 10629, 10630];
var wideRanges = [4352, 4447, 8986, 8987, 9001, 9002, 9193, 9196, 9200, 9200, 9203, 9203, 9725, 9726, 9748, 9749, 9776, 9783, 9800, 9811, 9855, 9855, 9866, 9871, 9875, 9875, 9889, 9889, 9898, 9899, 9917, 9918, 9924, 9925, 9934, 9934, 9940, 9940, 9962, 9962, 9970, 9971, 9973, 9973, 9978, 9978, 9981, 9981, 9989, 9989, 9994, 9995, 10024, 10024, 10060, 10060, 10062, 10062, 10067, 10069, 10071, 10071, 10133, 10135, 10160, 10160, 10175, 10175, 11035, 11036, 11088, 11088, 11093, 11093, 11904, 11929, 11931, 12019, 12032, 12245, 12272, 12287, 12289, 12350, 12353, 12438, 12441, 12543, 12549, 12591, 12593, 12686, 12688, 12773, 12783, 12830, 12832, 12871, 12880, 42124, 42128, 42182, 43360, 43388, 44032, 55203, 63744, 64255, 65040, 65049, 65072, 65106, 65108, 65126, 65128, 65131, 94176, 94180, 94192, 94198, 94208, 101589, 101631, 101662, 101760, 101874, 110576, 110579, 110581, 110587, 110589, 110590, 110592, 110882, 110898, 110898, 110928, 110930, 110933, 110933, 110948, 110951, 110960, 111355, 119552, 119638, 119648, 119670, 126980, 126980, 127183, 127183, 127374, 127374, 127377, 127386, 127488, 127490, 127504, 127547, 127552, 127560, 127568, 127569, 127584, 127589, 127744, 127776, 127789, 127797, 127799, 127868, 127870, 127891, 127904, 127946, 127951, 127955, 127968, 127984, 127988, 127988, 127992, 128062, 128064, 128064, 128066, 128252, 128255, 128317, 128331, 128334, 128336, 128359, 128378, 128378, 128405, 128406, 128420, 128420, 128507, 128591, 128640, 128709, 128716, 128716, 128720, 128722, 128725, 128728, 128732, 128735, 128747, 128748, 128756, 128764, 128992, 129003, 129008, 129008, 129292, 129338, 129340, 129349, 129351, 129535, 129648, 129660, 129664, 129674, 129678, 129734, 129736, 129736, 129741, 129756, 129759, 129770, 129775, 129784, 131072, 196605, 196608, 262141];

// node_modules/.pnpm/get-east-asian-width@1.5.0/node_modules/get-east-asian-width/utilities.js
var isInRange = (ranges, codePoint) => {
  let low = 0;
  let high = Math.floor(ranges.length / 2) - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const i = mid * 2;
    if (codePoint < ranges[i]) {
      high = mid - 1;
    } else if (codePoint > ranges[i + 1]) {
      low = mid + 1;
    } else {
      return true;
    }
  }
  return false;
};

// node_modules/.pnpm/get-east-asian-width@1.5.0/node_modules/get-east-asian-width/lookup.js
var minimumAmbiguousCodePoint = ambiguousRanges[0];
var maximumAmbiguousCodePoint = ambiguousRanges.at(-1);
var minimumFullWidthCodePoint = fullwidthRanges[0];
var maximumFullWidthCodePoint = fullwidthRanges.at(-1);
var minimumHalfWidthCodePoint = halfwidthRanges[0];
var maximumHalfWidthCodePoint = halfwidthRanges.at(-1);
var minimumNarrowCodePoint = narrowRanges[0];
var maximumNarrowCodePoint = narrowRanges.at(-1);
var minimumWideCodePoint = wideRanges[0];
var maximumWideCodePoint = wideRanges.at(-1);
var commonCjkCodePoint = 19968;
var [wideFastPathStart, wideFastPathEnd] = findWideFastPathRange(wideRanges);
function findWideFastPathRange(ranges) {
  let fastPathStart = ranges[0];
  let fastPathEnd = ranges[1];
  for (let index = 0; index < ranges.length; index += 2) {
    const start = ranges[index];
    const end = ranges[index + 1];
    if (commonCjkCodePoint >= start && commonCjkCodePoint <= end) {
      return [start, end];
    }
    if (end - start > fastPathEnd - fastPathStart) {
      fastPathStart = start;
      fastPathEnd = end;
    }
  }
  return [fastPathStart, fastPathEnd];
}
var isAmbiguous = (codePoint) => {
  if (codePoint < minimumAmbiguousCodePoint || codePoint > maximumAmbiguousCodePoint) {
    return false;
  }
  return isInRange(ambiguousRanges, codePoint);
};
var isFullWidth = (codePoint) => {
  if (codePoint < minimumFullWidthCodePoint || codePoint > maximumFullWidthCodePoint) {
    return false;
  }
  return isInRange(fullwidthRanges, codePoint);
};
var isWide = (codePoint) => {
  if (codePoint >= wideFastPathStart && codePoint <= wideFastPathEnd) {
    return true;
  }
  if (codePoint < minimumWideCodePoint || codePoint > maximumWideCodePoint) {
    return false;
  }
  return isInRange(wideRanges, codePoint);
};

// node_modules/.pnpm/get-east-asian-width@1.5.0/node_modules/get-east-asian-width/index.js
function validate(codePoint) {
  if (!Number.isSafeInteger(codePoint)) {
    throw new TypeError(`Expected a code point, got \`${typeof codePoint}\`.`);
  }
}
function eastAsianWidth(codePoint, { ambiguousAsWide = false } = {}) {
  validate(codePoint);
  if (isFullWidth(codePoint) || isWide(codePoint) || ambiguousAsWide && isAmbiguous(codePoint)) {
    return 2;
  }
  return 1;
}

// node_modules/.pnpm/string-width@7.2.0/node_modules/string-width/index.js
var import_emoji_regex = __toESM(require_emoji_regex(), 1);
var segmenter = new Intl.Segmenter();
var defaultIgnorableCodePointRegex = new RegExp("^\\p{Default_Ignorable_Code_Point}$", "u");
function stringWidth(string, options = {}) {
  if (typeof string !== "string" || string.length === 0) {
    return 0;
  }
  const {
    ambiguousIsNarrow = true,
    countAnsiEscapeCodes = false
  } = options;
  if (!countAnsiEscapeCodes) {
    string = stripAnsi(string);
  }
  if (string.length === 0) {
    return 0;
  }
  let width = 0;
  const eastAsianWidthOptions = { ambiguousAsWide: !ambiguousIsNarrow };
  for (const { segment: character } of segmenter.segment(string)) {
    const codePoint = character.codePointAt(0);
    if (codePoint <= 31 || codePoint >= 127 && codePoint <= 159) {
      continue;
    }
    if (codePoint >= 8203 && codePoint <= 8207 || codePoint === 65279) {
      continue;
    }
    if (codePoint >= 768 && codePoint <= 879 || codePoint >= 6832 && codePoint <= 6911 || codePoint >= 7616 && codePoint <= 7679 || codePoint >= 8400 && codePoint <= 8447 || codePoint >= 65056 && codePoint <= 65071) {
      continue;
    }
    if (codePoint >= 55296 && codePoint <= 57343) {
      continue;
    }
    if (codePoint >= 65024 && codePoint <= 65039) {
      continue;
    }
    if (defaultIgnorableCodePointRegex.test(character)) {
      continue;
    }
    if ((0, import_emoji_regex.default)().test(character)) {
      width += 2;
      continue;
    }
    width += eastAsianWidth(codePoint, eastAsianWidthOptions);
  }
  return width;
}

// node_modules/.pnpm/chalk@5.6.2/node_modules/chalk/source/vendor/ansi-styles/index.js
var ANSI_BACKGROUND_OFFSET = 10;
var wrapAnsi16 = (offset = 0) => (code) => `\x1B[${code + offset}m`;
var wrapAnsi256 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`;
var wrapAnsi16m = (offset = 0) => (red2, green2, blue2) => `\x1B[${38 + offset};2;${red2};${green2};${blue2}m`;
var styles = {
  modifier: {
    reset: [0, 0],
    // 21 isn't widely supported and 22 does the same thing
    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    overline: [53, 55],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29]
  },
  color: {
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    // Bright color
    blackBright: [90, 39],
    gray: [90, 39],
    // Alias of `blackBright`
    grey: [90, 39],
    // Alias of `blackBright`
    redBright: [91, 39],
    greenBright: [92, 39],
    yellowBright: [93, 39],
    blueBright: [94, 39],
    magentaBright: [95, 39],
    cyanBright: [96, 39],
    whiteBright: [97, 39]
  },
  bgColor: {
    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],
    // Bright color
    bgBlackBright: [100, 49],
    bgGray: [100, 49],
    // Alias of `bgBlackBright`
    bgGrey: [100, 49],
    // Alias of `bgBlackBright`
    bgRedBright: [101, 49],
    bgGreenBright: [102, 49],
    bgYellowBright: [103, 49],
    bgBlueBright: [104, 49],
    bgMagentaBright: [105, 49],
    bgCyanBright: [106, 49],
    bgWhiteBright: [107, 49]
  }
};
var modifierNames = Object.keys(styles.modifier);
var foregroundColorNames = Object.keys(styles.color);
var backgroundColorNames = Object.keys(styles.bgColor);
var colorNames = [...foregroundColorNames, ...backgroundColorNames];
function assembleStyles() {
  const codes = /* @__PURE__ */ new Map();
  for (const [groupName, group] of Object.entries(styles)) {
    for (const [styleName, style] of Object.entries(group)) {
      styles[styleName] = {
        open: `\x1B[${style[0]}m`,
        close: `\x1B[${style[1]}m`
      };
      group[styleName] = styles[styleName];
      codes.set(style[0], style[1]);
    }
    Object.defineProperty(styles, groupName, {
      value: group,
      enumerable: false
    });
  }
  Object.defineProperty(styles, "codes", {
    value: codes,
    enumerable: false
  });
  styles.color.close = "\x1B[39m";
  styles.bgColor.close = "\x1B[49m";
  styles.color.ansi = wrapAnsi16();
  styles.color.ansi256 = wrapAnsi256();
  styles.color.ansi16m = wrapAnsi16m();
  styles.bgColor.ansi = wrapAnsi16(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
  Object.defineProperties(styles, {
    rgbToAnsi256: {
      value(red2, green2, blue2) {
        if (red2 === green2 && green2 === blue2) {
          if (red2 < 8) {
            return 16;
          }
          if (red2 > 248) {
            return 231;
          }
          return Math.round((red2 - 8) / 247 * 24) + 232;
        }
        return 16 + 36 * Math.round(red2 / 255 * 5) + 6 * Math.round(green2 / 255 * 5) + Math.round(blue2 / 255 * 5);
      },
      enumerable: false
    },
    hexToRgb: {
      value(hex) {
        const matches = /[a-f\d]{6}|[a-f\d]{3}/i.exec(hex.toString(16));
        if (!matches) {
          return [0, 0, 0];
        }
        let [colorString] = matches;
        if (colorString.length === 3) {
          colorString = [...colorString].map((character) => character + character).join("");
        }
        const integer = Number.parseInt(colorString, 16);
        return [
          /* eslint-disable no-bitwise */
          integer >> 16 & 255,
          integer >> 8 & 255,
          integer & 255
          /* eslint-enable no-bitwise */
        ];
      },
      enumerable: false
    },
    hexToAnsi256: {
      value: (hex) => styles.rgbToAnsi256(...styles.hexToRgb(hex)),
      enumerable: false
    },
    ansi256ToAnsi: {
      value(code) {
        if (code < 8) {
          return 30 + code;
        }
        if (code < 16) {
          return 90 + (code - 8);
        }
        let red2;
        let green2;
        let blue2;
        if (code >= 232) {
          red2 = ((code - 232) * 10 + 8) / 255;
          green2 = red2;
          blue2 = red2;
        } else {
          code -= 16;
          const remainder = code % 36;
          red2 = Math.floor(code / 36) / 5;
          green2 = Math.floor(remainder / 6) / 5;
          blue2 = remainder % 6 / 5;
        }
        const value = Math.max(red2, green2, blue2) * 2;
        if (value === 0) {
          return 30;
        }
        let result = 30 + (Math.round(blue2) << 2 | Math.round(green2) << 1 | Math.round(red2));
        if (value === 2) {
          result += 60;
        }
        return result;
      },
      enumerable: false
    },
    rgbToAnsi: {
      value: (red2, green2, blue2) => styles.ansi256ToAnsi(styles.rgbToAnsi256(red2, green2, blue2)),
      enumerable: false
    },
    hexToAnsi: {
      value: (hex) => styles.ansi256ToAnsi(styles.hexToAnsi256(hex)),
      enumerable: false
    }
  });
  return styles;
}
var ansiStyles = assembleStyles();
var ansi_styles_default = ansiStyles;

// node_modules/.pnpm/chalk@5.6.2/node_modules/chalk/source/vendor/supports-color/index.js
var import_node_process = __toESM(require("node:process"), 1);
var import_node_os = __toESM(require("node:os"), 1);
var import_node_tty = __toESM(require("node:tty"), 1);
function hasFlag(flag, argv = globalThis.Deno ? globalThis.Deno.args : import_node_process.default.argv) {
  const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
  const position = argv.indexOf(prefix + flag);
  const terminatorPosition = argv.indexOf("--");
  return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
}
var { env } = import_node_process.default;
var flagForceColor;
if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
  flagForceColor = 0;
} else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
  flagForceColor = 1;
}
function envForceColor() {
  if ("FORCE_COLOR" in env) {
    if (env.FORCE_COLOR === "true") {
      return 1;
    }
    if (env.FORCE_COLOR === "false") {
      return 0;
    }
    return env.FORCE_COLOR.length === 0 ? 1 : Math.min(Number.parseInt(env.FORCE_COLOR, 10), 3);
  }
}
function translateLevel(level) {
  if (level === 0) {
    return false;
  }
  return {
    level,
    hasBasic: true,
    has256: level >= 2,
    has16m: level >= 3
  };
}
function _supportsColor(haveStream, { streamIsTTY, sniffFlags = true } = {}) {
  const noFlagForceColor = envForceColor();
  if (noFlagForceColor !== void 0) {
    flagForceColor = noFlagForceColor;
  }
  const forceColor = sniffFlags ? flagForceColor : noFlagForceColor;
  if (forceColor === 0) {
    return 0;
  }
  if (sniffFlags) {
    if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
      return 3;
    }
    if (hasFlag("color=256")) {
      return 2;
    }
  }
  if ("TF_BUILD" in env && "AGENT_NAME" in env) {
    return 1;
  }
  if (haveStream && !streamIsTTY && forceColor === void 0) {
    return 0;
  }
  const min = forceColor || 0;
  if (env.TERM === "dumb") {
    return min;
  }
  if (import_node_process.default.platform === "win32") {
    const osRelease = import_node_os.default.release().split(".");
    if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
      return Number(osRelease[2]) >= 14931 ? 3 : 2;
    }
    return 1;
  }
  if ("CI" in env) {
    if (["GITHUB_ACTIONS", "GITEA_ACTIONS", "CIRCLECI"].some((key) => key in env)) {
      return 3;
    }
    if (["TRAVIS", "APPVEYOR", "GITLAB_CI", "BUILDKITE", "DRONE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
      return 1;
    }
    return min;
  }
  if ("TEAMCITY_VERSION" in env) {
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
  }
  if (env.COLORTERM === "truecolor") {
    return 3;
  }
  if (env.TERM === "xterm-kitty") {
    return 3;
  }
  if (env.TERM === "xterm-ghostty") {
    return 3;
  }
  if (env.TERM === "wezterm") {
    return 3;
  }
  if ("TERM_PROGRAM" in env) {
    const version = Number.parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
    switch (env.TERM_PROGRAM) {
      case "iTerm.app": {
        return version >= 3 ? 3 : 2;
      }
      case "Apple_Terminal": {
        return 2;
      }
    }
  }
  if (/-256(color)?$/i.test(env.TERM)) {
    return 2;
  }
  if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
    return 1;
  }
  if ("COLORTERM" in env) {
    return 1;
  }
  return min;
}
function createSupportsColor(stream, options = {}) {
  const level = _supportsColor(stream, {
    streamIsTTY: stream && stream.isTTY,
    ...options
  });
  return translateLevel(level);
}
var supportsColor = {
  stdout: createSupportsColor({ isTTY: import_node_tty.default.isatty(1) }),
  stderr: createSupportsColor({ isTTY: import_node_tty.default.isatty(2) })
};
var supports_color_default = supportsColor;

// node_modules/.pnpm/chalk@5.6.2/node_modules/chalk/source/utilities.js
function stringReplaceAll(string, substring, replacer) {
  let index = string.indexOf(substring);
  if (index === -1) {
    return string;
  }
  const substringLength = substring.length;
  let endIndex = 0;
  let returnValue = "";
  do {
    returnValue += string.slice(endIndex, index) + substring + replacer;
    endIndex = index + substringLength;
    index = string.indexOf(substring, endIndex);
  } while (index !== -1);
  returnValue += string.slice(endIndex);
  return returnValue;
}
function stringEncaseCRLFWithFirstIndex(string, prefix, postfix, index) {
  let endIndex = 0;
  let returnValue = "";
  do {
    const gotCR = string[index - 1] === "\r";
    returnValue += string.slice(endIndex, gotCR ? index - 1 : index) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
    endIndex = index + 1;
    index = string.indexOf("\n", endIndex);
  } while (index !== -1);
  returnValue += string.slice(endIndex);
  return returnValue;
}

// node_modules/.pnpm/chalk@5.6.2/node_modules/chalk/source/index.js
var { stdout: stdoutColor, stderr: stderrColor } = supports_color_default;
var GENERATOR = Symbol("GENERATOR");
var STYLER = Symbol("STYLER");
var IS_EMPTY = Symbol("IS_EMPTY");
var levelMapping = [
  "ansi",
  "ansi",
  "ansi256",
  "ansi16m"
];
var styles2 = /* @__PURE__ */ Object.create(null);
var applyOptions = (object, options = {}) => {
  if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
    throw new Error("The `level` option should be an integer from 0 to 3");
  }
  const colorLevel = stdoutColor ? stdoutColor.level : 0;
  object.level = options.level === void 0 ? colorLevel : options.level;
};
var chalkFactory = (options) => {
  const chalk2 = (...strings) => strings.join(" ");
  applyOptions(chalk2, options);
  Object.setPrototypeOf(chalk2, createChalk.prototype);
  return chalk2;
};
function createChalk(options) {
  return chalkFactory(options);
}
Object.setPrototypeOf(createChalk.prototype, Function.prototype);
for (const [styleName, style] of Object.entries(ansi_styles_default)) {
  styles2[styleName] = {
    get() {
      const builder = createBuilder(this, createStyler(style.open, style.close, this[STYLER]), this[IS_EMPTY]);
      Object.defineProperty(this, styleName, { value: builder });
      return builder;
    }
  };
}
styles2.visible = {
  get() {
    const builder = createBuilder(this, this[STYLER], true);
    Object.defineProperty(this, "visible", { value: builder });
    return builder;
  }
};
var getModelAnsi = (model, level, type, ...arguments_) => {
  if (model === "rgb") {
    if (level === "ansi16m") {
      return ansi_styles_default[type].ansi16m(...arguments_);
    }
    if (level === "ansi256") {
      return ansi_styles_default[type].ansi256(ansi_styles_default.rgbToAnsi256(...arguments_));
    }
    return ansi_styles_default[type].ansi(ansi_styles_default.rgbToAnsi(...arguments_));
  }
  if (model === "hex") {
    return getModelAnsi("rgb", level, type, ...ansi_styles_default.hexToRgb(...arguments_));
  }
  return ansi_styles_default[type][model](...arguments_);
};
var usedModels = ["rgb", "hex", "ansi256"];
for (const model of usedModels) {
  styles2[model] = {
    get() {
      const { level } = this;
      return function(...arguments_) {
        const styler = createStyler(getModelAnsi(model, levelMapping[level], "color", ...arguments_), ansi_styles_default.color.close, this[STYLER]);
        return createBuilder(this, styler, this[IS_EMPTY]);
      };
    }
  };
  const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
  styles2[bgModel] = {
    get() {
      const { level } = this;
      return function(...arguments_) {
        const styler = createStyler(getModelAnsi(model, levelMapping[level], "bgColor", ...arguments_), ansi_styles_default.bgColor.close, this[STYLER]);
        return createBuilder(this, styler, this[IS_EMPTY]);
      };
    }
  };
}
var proto = Object.defineProperties(() => {
}, {
  ...styles2,
  level: {
    enumerable: true,
    get() {
      return this[GENERATOR].level;
    },
    set(level) {
      this[GENERATOR].level = level;
    }
  }
});
var createStyler = (open, close, parent) => {
  let openAll;
  let closeAll;
  if (parent === void 0) {
    openAll = open;
    closeAll = close;
  } else {
    openAll = parent.openAll + open;
    closeAll = close + parent.closeAll;
  }
  return {
    open,
    close,
    openAll,
    closeAll,
    parent
  };
};
var createBuilder = (self, _styler, _isEmpty) => {
  const builder = (...arguments_) => applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
  Object.setPrototypeOf(builder, proto);
  builder[GENERATOR] = self;
  builder[STYLER] = _styler;
  builder[IS_EMPTY] = _isEmpty;
  return builder;
};
var applyStyle = (self, string) => {
  if (self.level <= 0 || !string) {
    return self[IS_EMPTY] ? "" : string;
  }
  let styler = self[STYLER];
  if (styler === void 0) {
    return string;
  }
  const { openAll, closeAll } = styler;
  if (string.includes("\x1B")) {
    while (styler !== void 0) {
      string = stringReplaceAll(string, styler.close, styler.open);
      styler = styler.parent;
    }
  }
  const lfIndex = string.indexOf("\n");
  if (lfIndex !== -1) {
    string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
  }
  return openAll + string + closeAll;
};
Object.defineProperties(createChalk.prototype, styles2);
var chalk = createChalk();
var chalkStderr = createChalk({ level: stderrColor ? stderrColor.level : 0 });
var source_default = chalk;

// node_modules/.pnpm/widest-line@5.0.0/node_modules/widest-line/index.js
function widestLine(string) {
  let lineWidth = 0;
  for (const line of string.split("\n")) {
    lineWidth = Math.max(lineWidth, stringWidth(line));
  }
  return lineWidth;
}

// node_modules/.pnpm/boxen@8.0.1/node_modules/boxen/index.js
var import_cli_boxes = __toESM(require_cli_boxes(), 1);

// node_modules/.pnpm/camelcase@8.0.0/node_modules/camelcase/index.js
var UPPERCASE = /[\p{Lu}]/u;
var LOWERCASE = /[\p{Ll}]/u;
var LEADING_CAPITAL = /^[\p{Lu}](?![\p{Lu}])/gu;
var IDENTIFIER = /([\p{Alpha}\p{N}_]|$)/u;
var SEPARATORS = /[_.\- ]+/;
var LEADING_SEPARATORS = new RegExp("^" + SEPARATORS.source);
var SEPARATORS_AND_IDENTIFIER = new RegExp(SEPARATORS.source + IDENTIFIER.source, "gu");
var NUMBERS_AND_IDENTIFIER = new RegExp("\\d+" + IDENTIFIER.source, "gu");
var preserveCamelCase = (string, toLowerCase, toUpperCase, preserveConsecutiveUppercase2) => {
  let isLastCharLower = false;
  let isLastCharUpper = false;
  let isLastLastCharUpper = false;
  let isLastLastCharPreserved = false;
  for (let index = 0; index < string.length; index++) {
    const character = string[index];
    isLastLastCharPreserved = index > 2 ? string[index - 3] === "-" : true;
    if (isLastCharLower && UPPERCASE.test(character)) {
      string = string.slice(0, index) + "-" + string.slice(index);
      isLastCharLower = false;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = true;
      index++;
    } else if (isLastCharUpper && isLastLastCharUpper && LOWERCASE.test(character) && (!isLastLastCharPreserved || preserveConsecutiveUppercase2)) {
      string = string.slice(0, index - 1) + "-" + string.slice(index - 1);
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = false;
      isLastCharLower = true;
    } else {
      isLastCharLower = toLowerCase(character) === character && toUpperCase(character) !== character;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = toUpperCase(character) === character && toLowerCase(character) !== character;
    }
  }
  return string;
};
var preserveConsecutiveUppercase = (input2, toLowerCase) => {
  LEADING_CAPITAL.lastIndex = 0;
  return input2.replaceAll(LEADING_CAPITAL, (match) => toLowerCase(match));
};
var postProcess = (input2, toUpperCase) => {
  SEPARATORS_AND_IDENTIFIER.lastIndex = 0;
  NUMBERS_AND_IDENTIFIER.lastIndex = 0;
  return input2.replaceAll(NUMBERS_AND_IDENTIFIER, (match, pattern, offset) => ["_", "-"].includes(input2.charAt(offset + match.length)) ? match : toUpperCase(match)).replaceAll(SEPARATORS_AND_IDENTIFIER, (_, identifier) => toUpperCase(identifier));
};
function camelCase(input2, options) {
  if (!(typeof input2 === "string" || Array.isArray(input2))) {
    throw new TypeError("Expected the input to be `string | string[]`");
  }
  options = {
    pascalCase: false,
    preserveConsecutiveUppercase: false,
    ...options
  };
  if (Array.isArray(input2)) {
    input2 = input2.map((x) => x.trim()).filter((x) => x.length).join("-");
  } else {
    input2 = input2.trim();
  }
  if (input2.length === 0) {
    return "";
  }
  const toLowerCase = options.locale === false ? (string) => string.toLowerCase() : (string) => string.toLocaleLowerCase(options.locale);
  const toUpperCase = options.locale === false ? (string) => string.toUpperCase() : (string) => string.toLocaleUpperCase(options.locale);
  if (input2.length === 1) {
    if (SEPARATORS.test(input2)) {
      return "";
    }
    return options.pascalCase ? toUpperCase(input2) : toLowerCase(input2);
  }
  const hasUpperCase = input2 !== toLowerCase(input2);
  if (hasUpperCase) {
    input2 = preserveCamelCase(input2, toLowerCase, toUpperCase, options.preserveConsecutiveUppercase);
  }
  input2 = input2.replace(LEADING_SEPARATORS, "");
  input2 = options.preserveConsecutiveUppercase ? preserveConsecutiveUppercase(input2, toLowerCase) : toLowerCase(input2);
  if (options.pascalCase) {
    input2 = toUpperCase(input2.charAt(0)) + input2.slice(1);
  }
  return postProcess(input2, toUpperCase);
}

// node_modules/.pnpm/boxen@8.0.1/node_modules/boxen/index.js
var import_ansi_align = __toESM(require_ansi_align(), 1);

// node_modules/.pnpm/ansi-styles@6.2.3/node_modules/ansi-styles/index.js
var ANSI_BACKGROUND_OFFSET2 = 10;
var wrapAnsi162 = (offset = 0) => (code) => `\x1B[${code + offset}m`;
var wrapAnsi2562 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`;
var wrapAnsi16m2 = (offset = 0) => (red2, green2, blue2) => `\x1B[${38 + offset};2;${red2};${green2};${blue2}m`;
var styles3 = {
  modifier: {
    reset: [0, 0],
    // 21 isn't widely supported and 22 does the same thing
    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    overline: [53, 55],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29]
  },
  color: {
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    // Bright color
    blackBright: [90, 39],
    gray: [90, 39],
    // Alias of `blackBright`
    grey: [90, 39],
    // Alias of `blackBright`
    redBright: [91, 39],
    greenBright: [92, 39],
    yellowBright: [93, 39],
    blueBright: [94, 39],
    magentaBright: [95, 39],
    cyanBright: [96, 39],
    whiteBright: [97, 39]
  },
  bgColor: {
    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],
    // Bright color
    bgBlackBright: [100, 49],
    bgGray: [100, 49],
    // Alias of `bgBlackBright`
    bgGrey: [100, 49],
    // Alias of `bgBlackBright`
    bgRedBright: [101, 49],
    bgGreenBright: [102, 49],
    bgYellowBright: [103, 49],
    bgBlueBright: [104, 49],
    bgMagentaBright: [105, 49],
    bgCyanBright: [106, 49],
    bgWhiteBright: [107, 49]
  }
};
var modifierNames2 = Object.keys(styles3.modifier);
var foregroundColorNames2 = Object.keys(styles3.color);
var backgroundColorNames2 = Object.keys(styles3.bgColor);
var colorNames2 = [...foregroundColorNames2, ...backgroundColorNames2];
function assembleStyles2() {
  const codes = /* @__PURE__ */ new Map();
  for (const [groupName, group] of Object.entries(styles3)) {
    for (const [styleName, style] of Object.entries(group)) {
      styles3[styleName] = {
        open: `\x1B[${style[0]}m`,
        close: `\x1B[${style[1]}m`
      };
      group[styleName] = styles3[styleName];
      codes.set(style[0], style[1]);
    }
    Object.defineProperty(styles3, groupName, {
      value: group,
      enumerable: false
    });
  }
  Object.defineProperty(styles3, "codes", {
    value: codes,
    enumerable: false
  });
  styles3.color.close = "\x1B[39m";
  styles3.bgColor.close = "\x1B[49m";
  styles3.color.ansi = wrapAnsi162();
  styles3.color.ansi256 = wrapAnsi2562();
  styles3.color.ansi16m = wrapAnsi16m2();
  styles3.bgColor.ansi = wrapAnsi162(ANSI_BACKGROUND_OFFSET2);
  styles3.bgColor.ansi256 = wrapAnsi2562(ANSI_BACKGROUND_OFFSET2);
  styles3.bgColor.ansi16m = wrapAnsi16m2(ANSI_BACKGROUND_OFFSET2);
  Object.defineProperties(styles3, {
    rgbToAnsi256: {
      value(red2, green2, blue2) {
        if (red2 === green2 && green2 === blue2) {
          if (red2 < 8) {
            return 16;
          }
          if (red2 > 248) {
            return 231;
          }
          return Math.round((red2 - 8) / 247 * 24) + 232;
        }
        return 16 + 36 * Math.round(red2 / 255 * 5) + 6 * Math.round(green2 / 255 * 5) + Math.round(blue2 / 255 * 5);
      },
      enumerable: false
    },
    hexToRgb: {
      value(hex) {
        const matches = /[a-f\d]{6}|[a-f\d]{3}/i.exec(hex.toString(16));
        if (!matches) {
          return [0, 0, 0];
        }
        let [colorString] = matches;
        if (colorString.length === 3) {
          colorString = [...colorString].map((character) => character + character).join("");
        }
        const integer = Number.parseInt(colorString, 16);
        return [
          /* eslint-disable no-bitwise */
          integer >> 16 & 255,
          integer >> 8 & 255,
          integer & 255
          /* eslint-enable no-bitwise */
        ];
      },
      enumerable: false
    },
    hexToAnsi256: {
      value: (hex) => styles3.rgbToAnsi256(...styles3.hexToRgb(hex)),
      enumerable: false
    },
    ansi256ToAnsi: {
      value(code) {
        if (code < 8) {
          return 30 + code;
        }
        if (code < 16) {
          return 90 + (code - 8);
        }
        let red2;
        let green2;
        let blue2;
        if (code >= 232) {
          red2 = ((code - 232) * 10 + 8) / 255;
          green2 = red2;
          blue2 = red2;
        } else {
          code -= 16;
          const remainder = code % 36;
          red2 = Math.floor(code / 36) / 5;
          green2 = Math.floor(remainder / 6) / 5;
          blue2 = remainder % 6 / 5;
        }
        const value = Math.max(red2, green2, blue2) * 2;
        if (value === 0) {
          return 30;
        }
        let result = 30 + (Math.round(blue2) << 2 | Math.round(green2) << 1 | Math.round(red2));
        if (value === 2) {
          result += 60;
        }
        return result;
      },
      enumerable: false
    },
    rgbToAnsi: {
      value: (red2, green2, blue2) => styles3.ansi256ToAnsi(styles3.rgbToAnsi256(red2, green2, blue2)),
      enumerable: false
    },
    hexToAnsi: {
      value: (hex) => styles3.ansi256ToAnsi(styles3.hexToAnsi256(hex)),
      enumerable: false
    }
  });
  return styles3;
}
var ansiStyles2 = assembleStyles2();
var ansi_styles_default2 = ansiStyles2;

// node_modules/.pnpm/wrap-ansi@9.0.2/node_modules/wrap-ansi/index.js
var ESCAPES = /* @__PURE__ */ new Set([
  "\x1B",
  "\x9B"
]);
var END_CODE = 39;
var ANSI_ESCAPE_BELL = "\x07";
var ANSI_CSI = "[";
var ANSI_OSC = "]";
var ANSI_SGR_TERMINATOR = "m";
var ANSI_ESCAPE_LINK = `${ANSI_OSC}8;;`;
var wrapAnsiCode = (code) => `${ESCAPES.values().next().value}${ANSI_CSI}${code}${ANSI_SGR_TERMINATOR}`;
var wrapAnsiHyperlink = (url) => `${ESCAPES.values().next().value}${ANSI_ESCAPE_LINK}${url}${ANSI_ESCAPE_BELL}`;
var wordLengths = (string) => string.split(" ").map((character) => stringWidth(character));
var wrapWord = (rows, word, columns) => {
  const characters = [...word];
  let isInsideEscape = false;
  let isInsideLinkEscape = false;
  let visible = stringWidth(stripAnsi(rows.at(-1)));
  for (const [index, character] of characters.entries()) {
    const characterLength = stringWidth(character);
    if (visible + characterLength <= columns) {
      rows[rows.length - 1] += character;
    } else {
      rows.push(character);
      visible = 0;
    }
    if (ESCAPES.has(character)) {
      isInsideEscape = true;
      const ansiEscapeLinkCandidate = characters.slice(index + 1, index + 1 + ANSI_ESCAPE_LINK.length).join("");
      isInsideLinkEscape = ansiEscapeLinkCandidate === ANSI_ESCAPE_LINK;
    }
    if (isInsideEscape) {
      if (isInsideLinkEscape) {
        if (character === ANSI_ESCAPE_BELL) {
          isInsideEscape = false;
          isInsideLinkEscape = false;
        }
      } else if (character === ANSI_SGR_TERMINATOR) {
        isInsideEscape = false;
      }
      continue;
    }
    visible += characterLength;
    if (visible === columns && index < characters.length - 1) {
      rows.push("");
      visible = 0;
    }
  }
  if (!visible && rows.at(-1).length > 0 && rows.length > 1) {
    rows[rows.length - 2] += rows.pop();
  }
};
var stringVisibleTrimSpacesRight = (string) => {
  const words = string.split(" ");
  let last = words.length;
  while (last > 0) {
    if (stringWidth(words[last - 1]) > 0) {
      break;
    }
    last--;
  }
  if (last === words.length) {
    return string;
  }
  return words.slice(0, last).join(" ") + words.slice(last).join("");
};
var exec = (string, columns, options = {}) => {
  if (options.trim !== false && string.trim() === "") {
    return "";
  }
  let returnValue = "";
  let escapeCode;
  let escapeUrl;
  const lengths = wordLengths(string);
  let rows = [""];
  for (const [index, word] of string.split(" ").entries()) {
    if (options.trim !== false) {
      rows[rows.length - 1] = rows.at(-1).trimStart();
    }
    let rowLength = stringWidth(rows.at(-1));
    if (index !== 0) {
      if (rowLength >= columns && (options.wordWrap === false || options.trim === false)) {
        rows.push("");
        rowLength = 0;
      }
      if (rowLength > 0 || options.trim === false) {
        rows[rows.length - 1] += " ";
        rowLength++;
      }
    }
    if (options.hard && lengths[index] > columns) {
      const remainingColumns = columns - rowLength;
      const breaksStartingThisLine = 1 + Math.floor((lengths[index] - remainingColumns - 1) / columns);
      const breaksStartingNextLine = Math.floor((lengths[index] - 1) / columns);
      if (breaksStartingNextLine < breaksStartingThisLine) {
        rows.push("");
      }
      wrapWord(rows, word, columns);
      continue;
    }
    if (rowLength + lengths[index] > columns && rowLength > 0 && lengths[index] > 0) {
      if (options.wordWrap === false && rowLength < columns) {
        wrapWord(rows, word, columns);
        continue;
      }
      rows.push("");
    }
    if (rowLength + lengths[index] > columns && options.wordWrap === false) {
      wrapWord(rows, word, columns);
      continue;
    }
    rows[rows.length - 1] += word;
  }
  if (options.trim !== false) {
    rows = rows.map((row) => stringVisibleTrimSpacesRight(row));
  }
  const preString = rows.join("\n");
  const pre = [...preString];
  let preStringIndex = 0;
  for (const [index, character] of pre.entries()) {
    returnValue += character;
    if (ESCAPES.has(character)) {
      const { groups } = new RegExp(`(?:\\${ANSI_CSI}(?<code>\\d+)m|\\${ANSI_ESCAPE_LINK}(?<uri>.*)${ANSI_ESCAPE_BELL})`).exec(preString.slice(preStringIndex)) || { groups: {} };
      if (groups.code !== void 0) {
        const code2 = Number.parseFloat(groups.code);
        escapeCode = code2 === END_CODE ? void 0 : code2;
      } else if (groups.uri !== void 0) {
        escapeUrl = groups.uri.length === 0 ? void 0 : groups.uri;
      }
    }
    const code = ansi_styles_default2.codes.get(Number(escapeCode));
    if (pre[index + 1] === "\n") {
      if (escapeUrl) {
        returnValue += wrapAnsiHyperlink("");
      }
      if (escapeCode && code) {
        returnValue += wrapAnsiCode(code);
      }
    } else if (character === "\n") {
      if (escapeCode && code) {
        returnValue += wrapAnsiCode(escapeCode);
      }
      if (escapeUrl) {
        returnValue += wrapAnsiHyperlink(escapeUrl);
      }
    }
    preStringIndex += character.length;
  }
  return returnValue;
};
function wrapAnsi(string, columns, options) {
  return String(string).normalize().replaceAll("\r\n", "\n").split("\n").map((line) => exec(line, columns, options)).join("\n");
}

// node_modules/.pnpm/boxen@8.0.1/node_modules/boxen/index.js
var import_cli_boxes2 = __toESM(require_cli_boxes(), 1);
var NEWLINE = "\n";
var PAD = " ";
var NONE = "none";
var terminalColumns = () => {
  const { env: env2, stdout, stderr } = import_node_process2.default;
  if (stdout?.columns) {
    return stdout.columns;
  }
  if (stderr?.columns) {
    return stderr.columns;
  }
  if (env2.COLUMNS) {
    return Number.parseInt(env2.COLUMNS, 10);
  }
  return 80;
};
var getObject = (detail) => typeof detail === "number" ? {
  top: detail,
  right: detail * 3,
  bottom: detail,
  left: detail * 3
} : {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  ...detail
};
var getBorderWidth = (borderStyle) => borderStyle === NONE ? 0 : 2;
var getBorderChars = (borderStyle) => {
  const sides = [
    "topLeft",
    "topRight",
    "bottomRight",
    "bottomLeft",
    "left",
    "right",
    "top",
    "bottom"
  ];
  let characters;
  if (borderStyle === NONE) {
    borderStyle = {};
    for (const side of sides) {
      borderStyle[side] = "";
    }
  }
  if (typeof borderStyle === "string") {
    characters = import_cli_boxes.default[borderStyle];
    if (!characters) {
      throw new TypeError(`Invalid border style: ${borderStyle}`);
    }
  } else {
    if (typeof borderStyle?.vertical === "string") {
      borderStyle.left = borderStyle.vertical;
      borderStyle.right = borderStyle.vertical;
    }
    if (typeof borderStyle?.horizontal === "string") {
      borderStyle.top = borderStyle.horizontal;
      borderStyle.bottom = borderStyle.horizontal;
    }
    for (const side of sides) {
      if (borderStyle[side] === null || typeof borderStyle[side] !== "string") {
        throw new TypeError(`Invalid border style: ${side}`);
      }
    }
    characters = borderStyle;
  }
  return characters;
};
var makeTitle = (text, horizontal, alignment) => {
  let title = "";
  const textWidth = stringWidth(text);
  switch (alignment) {
    case "left": {
      title = text + horizontal.slice(textWidth);
      break;
    }
    case "right": {
      title = horizontal.slice(textWidth) + text;
      break;
    }
    default: {
      horizontal = horizontal.slice(textWidth);
      if (horizontal.length % 2 === 1) {
        horizontal = horizontal.slice(Math.floor(horizontal.length / 2));
        title = horizontal.slice(1) + text + horizontal;
      } else {
        horizontal = horizontal.slice(horizontal.length / 2);
        title = horizontal + text + horizontal;
      }
      break;
    }
  }
  return title;
};
var makeContentText = (text, { padding, width, textAlignment, height }) => {
  text = (0, import_ansi_align.default)(text, { align: textAlignment });
  let lines = text.split(NEWLINE);
  const textWidth = widestLine(text);
  const max = width - padding.left - padding.right;
  if (textWidth > max) {
    const newLines = [];
    for (const line of lines) {
      const createdLines = wrapAnsi(line, max, { hard: true });
      const alignedLines = (0, import_ansi_align.default)(createdLines, { align: textAlignment });
      const alignedLinesArray = alignedLines.split("\n");
      const longestLength = Math.max(...alignedLinesArray.map((s) => stringWidth(s)));
      for (const alignedLine of alignedLinesArray) {
        let paddedLine;
        switch (textAlignment) {
          case "center": {
            paddedLine = PAD.repeat((max - longestLength) / 2) + alignedLine;
            break;
          }
          case "right": {
            paddedLine = PAD.repeat(max - longestLength) + alignedLine;
            break;
          }
          default: {
            paddedLine = alignedLine;
            break;
          }
        }
        newLines.push(paddedLine);
      }
    }
    lines = newLines;
  }
  if (textAlignment === "center" && textWidth < max) {
    lines = lines.map((line) => PAD.repeat((max - textWidth) / 2) + line);
  } else if (textAlignment === "right" && textWidth < max) {
    lines = lines.map((line) => PAD.repeat(max - textWidth) + line);
  }
  const paddingLeft = PAD.repeat(padding.left);
  const paddingRight = PAD.repeat(padding.right);
  lines = lines.map((line) => {
    const newLine = paddingLeft + line + paddingRight;
    return newLine + PAD.repeat(width - stringWidth(newLine));
  });
  if (padding.top > 0) {
    lines = [...Array.from({ length: padding.top }).fill(PAD.repeat(width)), ...lines];
  }
  if (padding.bottom > 0) {
    lines = [...lines, ...Array.from({ length: padding.bottom }).fill(PAD.repeat(width))];
  }
  if (height && lines.length > height) {
    lines = lines.slice(0, height);
  } else if (height && lines.length < height) {
    lines = [...lines, ...Array.from({ length: height - lines.length }).fill(PAD.repeat(width))];
  }
  return lines.join(NEWLINE);
};
var boxContent = (content, contentWidth, options) => {
  const colorizeBorder = (border) => {
    const newBorder = options.borderColor ? getColorFunction(options.borderColor)(border) : border;
    return options.dimBorder ? source_default.dim(newBorder) : newBorder;
  };
  const colorizeContent = (content2) => options.backgroundColor ? getBGColorFunction(options.backgroundColor)(content2) : content2;
  const chars = getBorderChars(options.borderStyle);
  const columns = terminalColumns();
  let marginLeft = PAD.repeat(options.margin.left);
  if (options.float === "center") {
    const marginWidth = Math.max((columns - contentWidth - getBorderWidth(options.borderStyle)) / 2, 0);
    marginLeft = PAD.repeat(marginWidth);
  } else if (options.float === "right") {
    const marginWidth = Math.max(columns - contentWidth - options.margin.right - getBorderWidth(options.borderStyle), 0);
    marginLeft = PAD.repeat(marginWidth);
  }
  let result = "";
  if (options.margin.top) {
    result += NEWLINE.repeat(options.margin.top);
  }
  if (options.borderStyle !== NONE || options.title) {
    result += colorizeBorder(marginLeft + chars.topLeft + (options.title ? makeTitle(options.title, chars.top.repeat(contentWidth), options.titleAlignment) : chars.top.repeat(contentWidth)) + chars.topRight) + NEWLINE;
  }
  const lines = content.split(NEWLINE);
  result += lines.map((line) => marginLeft + colorizeBorder(chars.left) + colorizeContent(line) + colorizeBorder(chars.right)).join(NEWLINE);
  if (options.borderStyle !== NONE) {
    result += NEWLINE + colorizeBorder(marginLeft + chars.bottomLeft + chars.bottom.repeat(contentWidth) + chars.bottomRight);
  }
  if (options.margin.bottom) {
    result += NEWLINE.repeat(options.margin.bottom);
  }
  return result;
};
var sanitizeOptions = (options) => {
  if (options.fullscreen && import_node_process2.default?.stdout) {
    let newDimensions = [import_node_process2.default.stdout.columns, import_node_process2.default.stdout.rows];
    if (typeof options.fullscreen === "function") {
      newDimensions = options.fullscreen(...newDimensions);
    }
    options.width ||= newDimensions[0];
    options.height ||= newDimensions[1];
  }
  options.width &&= Math.max(1, options.width - getBorderWidth(options.borderStyle));
  options.height &&= Math.max(1, options.height - getBorderWidth(options.borderStyle));
  return options;
};
var formatTitle = (title, borderStyle) => borderStyle === NONE ? title : ` ${title} `;
var determineDimensions = (text, options) => {
  options = sanitizeOptions(options);
  const widthOverride = options.width !== void 0;
  const columns = terminalColumns();
  const borderWidth = getBorderWidth(options.borderStyle);
  const maxWidth = columns - options.margin.left - options.margin.right - borderWidth;
  const widest = widestLine(wrapAnsi(text, columns - borderWidth, { hard: true, trim: false })) + options.padding.left + options.padding.right;
  if (options.title && widthOverride) {
    options.title = options.title.slice(0, Math.max(0, options.width - 2));
    options.title &&= formatTitle(options.title, options.borderStyle);
  } else if (options.title) {
    options.title = options.title.slice(0, Math.max(0, maxWidth - 2));
    if (options.title) {
      options.title = formatTitle(options.title, options.borderStyle);
      if (stringWidth(options.title) > widest) {
        options.width = stringWidth(options.title);
      }
    }
  }
  options.width ||= widest;
  if (!widthOverride) {
    if (options.margin.left && options.margin.right && options.width > maxWidth) {
      const spaceForMargins = columns - options.width - borderWidth;
      const multiplier = spaceForMargins / (options.margin.left + options.margin.right);
      options.margin.left = Math.max(0, Math.floor(options.margin.left * multiplier));
      options.margin.right = Math.max(0, Math.floor(options.margin.right * multiplier));
    }
    options.width = Math.min(options.width, columns - borderWidth - options.margin.left - options.margin.right);
  }
  if (options.width - (options.padding.left + options.padding.right) <= 0) {
    options.padding.left = 0;
    options.padding.right = 0;
  }
  if (options.height && options.height - (options.padding.top + options.padding.bottom) <= 0) {
    options.padding.top = 0;
    options.padding.bottom = 0;
  }
  return options;
};
var isHex = (color) => color.match(/^#(?:[0-f]{3}){1,2}$/i);
var isColorValid = (color) => typeof color === "string" && (source_default[color] ?? isHex(color));
var getColorFunction = (color) => isHex(color) ? source_default.hex(color) : source_default[color];
var getBGColorFunction = (color) => isHex(color) ? source_default.bgHex(color) : source_default[camelCase(["bg", color])];
function boxen(text, options) {
  options = {
    padding: 0,
    borderStyle: "single",
    dimBorder: false,
    textAlignment: "left",
    float: "left",
    titleAlignment: "left",
    ...options
  };
  if (options.align) {
    options.textAlignment = options.align;
  }
  if (options.borderColor && !isColorValid(options.borderColor)) {
    throw new Error(`${options.borderColor} is not a valid borderColor`);
  }
  if (options.backgroundColor && !isColorValid(options.backgroundColor)) {
    throw new Error(`${options.backgroundColor} is not a valid backgroundColor`);
  }
  options.padding = getObject(options.padding);
  options.margin = getObject(options.margin);
  options = determineDimensions(text, options);
  text = makeContentText(text, options);
  return boxContent(text, options.width, options);
}

// node_modules/.pnpm/dotenv@17.4.2/node_modules/dotenv/config.js
(function() {
  require_main().config(
    Object.assign(
      {},
      require_env_options(),
      require_cli_options()(process.argv)
    )
  );
})();

// src/index.ts
var import_enquirer = __toESM(require_enquirer(), 1);
var import_promises5 = require("node:fs/promises");
var import_node_path5 = __toESM(require("node:path"), 1);

// node_modules/.pnpm/log-symbols@7.0.1/node_modules/log-symbols/symbols.js
var symbols_exports = {};
__export(symbols_exports, {
  error: () => error,
  info: () => info,
  success: () => success,
  warning: () => warning
});

// node_modules/.pnpm/yoctocolors@2.1.2/node_modules/yoctocolors/base.js
var import_node_tty2 = __toESM(require("node:tty"), 1);
var hasColors = import_node_tty2.default?.WriteStream?.prototype?.hasColors?.() ?? false;
var format = (open, close) => {
  if (!hasColors) {
    return (input2) => input2;
  }
  const openCode = `\x1B[${open}m`;
  const closeCode = `\x1B[${close}m`;
  return (input2) => {
    const string = input2 + "";
    let index = string.indexOf(closeCode);
    if (index === -1) {
      return openCode + string + closeCode;
    }
    let result = openCode;
    let lastIndex = 0;
    const reopenOnNestedClose = close === 22;
    const replaceCode = (reopenOnNestedClose ? closeCode : "") + openCode;
    while (index !== -1) {
      result += string.slice(lastIndex, index) + replaceCode;
      lastIndex = index + closeCode.length;
      index = string.indexOf(closeCode, lastIndex);
    }
    result += string.slice(lastIndex) + closeCode;
    return result;
  };
};
var reset = format(0, 0);
var bold = format(1, 22);
var dim = format(2, 22);
var italic = format(3, 23);
var underline = format(4, 24);
var overline = format(53, 55);
var inverse = format(7, 27);
var hidden = format(8, 28);
var strikethrough = format(9, 29);
var black = format(30, 39);
var red = format(31, 39);
var green = format(32, 39);
var yellow = format(33, 39);
var blue = format(34, 39);
var magenta = format(35, 39);
var cyan = format(36, 39);
var white = format(37, 39);
var gray = format(90, 39);
var bgBlack = format(40, 49);
var bgRed = format(41, 49);
var bgGreen = format(42, 49);
var bgYellow = format(43, 49);
var bgBlue = format(44, 49);
var bgMagenta = format(45, 49);
var bgCyan = format(46, 49);
var bgWhite = format(47, 49);
var bgGray = format(100, 49);
var redBright = format(91, 39);
var greenBright = format(92, 39);
var yellowBright = format(93, 39);
var blueBright = format(94, 39);
var magentaBright = format(95, 39);
var cyanBright = format(96, 39);
var whiteBright = format(97, 39);
var bgRedBright = format(101, 49);
var bgGreenBright = format(102, 49);
var bgYellowBright = format(103, 49);
var bgBlueBright = format(104, 49);
var bgMagentaBright = format(105, 49);
var bgCyanBright = format(106, 49);
var bgWhiteBright = format(107, 49);

// node_modules/.pnpm/is-unicode-supported@2.1.0/node_modules/is-unicode-supported/index.js
var import_node_process3 = __toESM(require("node:process"), 1);
function isUnicodeSupported() {
  const { env: env2 } = import_node_process3.default;
  const { TERM, TERM_PROGRAM } = env2;
  if (import_node_process3.default.platform !== "win32") {
    return TERM !== "linux";
  }
  return Boolean(env2.WT_SESSION) || Boolean(env2.TERMINUS_SUBLIME) || env2.ConEmuTask === "{cmd::Cmder}" || TERM_PROGRAM === "Terminus-Sublime" || TERM_PROGRAM === "vscode" || TERM === "xterm-256color" || TERM === "alacritty" || TERM === "rxvt-unicode" || TERM === "rxvt-unicode-256color" || env2.TERMINAL_EMULATOR === "JetBrains-JediTerm";
}

// node_modules/.pnpm/log-symbols@7.0.1/node_modules/log-symbols/symbols.js
var _isUnicodeSupported = isUnicodeSupported();
var info = blue(_isUnicodeSupported ? "\u2139" : "i");
var success = green(_isUnicodeSupported ? "\u2714" : "\u221A");
var warning = yellow(_isUnicodeSupported ? "\u26A0" : "\u203C");
var error = red(_isUnicodeSupported ? "\u2716" : "\xD7");

// node_modules/.pnpm/ora@9.4.0/node_modules/ora/index.js
var import_node_process7 = __toESM(require("node:process"), 1);
var import_node_util = require("node:util");

// node_modules/.pnpm/cli-cursor@5.0.0/node_modules/cli-cursor/index.js
var import_node_process5 = __toESM(require("node:process"), 1);

// node_modules/.pnpm/restore-cursor@5.1.0/node_modules/restore-cursor/index.js
var import_node_process4 = __toESM(require("node:process"), 1);

// node_modules/.pnpm/mimic-function@5.0.1/node_modules/mimic-function/index.js
var copyProperty = (to, from, property, ignoreNonConfigurable) => {
  if (property === "length" || property === "prototype") {
    return;
  }
  if (property === "arguments" || property === "caller") {
    return;
  }
  const toDescriptor = Object.getOwnPropertyDescriptor(to, property);
  const fromDescriptor = Object.getOwnPropertyDescriptor(from, property);
  if (!canCopyProperty(toDescriptor, fromDescriptor) && ignoreNonConfigurable) {
    return;
  }
  Object.defineProperty(to, property, fromDescriptor);
};
var canCopyProperty = function(toDescriptor, fromDescriptor) {
  return toDescriptor === void 0 || toDescriptor.configurable || toDescriptor.writable === fromDescriptor.writable && toDescriptor.enumerable === fromDescriptor.enumerable && toDescriptor.configurable === fromDescriptor.configurable && (toDescriptor.writable || toDescriptor.value === fromDescriptor.value);
};
var changePrototype = (to, from) => {
  const fromPrototype = Object.getPrototypeOf(from);
  if (fromPrototype === Object.getPrototypeOf(to)) {
    return;
  }
  Object.setPrototypeOf(to, fromPrototype);
};
var wrappedToString = (withName, fromBody) => `/* Wrapped ${withName}*/
${fromBody}`;
var toStringDescriptor = Object.getOwnPropertyDescriptor(Function.prototype, "toString");
var toStringName = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name");
var changeToString = (to, from, name) => {
  const withName = name === "" ? "" : `with ${name.trim()}() `;
  const newToString = wrappedToString.bind(null, withName, from.toString());
  Object.defineProperty(newToString, "name", toStringName);
  const { writable, enumerable, configurable } = toStringDescriptor;
  Object.defineProperty(to, "toString", { value: newToString, writable, enumerable, configurable });
};
function mimicFunction(to, from, { ignoreNonConfigurable = false } = {}) {
  const { name } = to;
  for (const property of Reflect.ownKeys(from)) {
    copyProperty(to, from, property, ignoreNonConfigurable);
  }
  changePrototype(to, from);
  changeToString(to, from, name);
  return to;
}

// node_modules/.pnpm/onetime@7.0.0/node_modules/onetime/index.js
var calledFunctions = /* @__PURE__ */ new WeakMap();
var onetime = (function_, options = {}) => {
  if (typeof function_ !== "function") {
    throw new TypeError("Expected a function");
  }
  let returnValue;
  let callCount = 0;
  const functionName = function_.displayName || function_.name || "<anonymous>";
  const onetime2 = function(...arguments_) {
    calledFunctions.set(onetime2, ++callCount);
    if (callCount === 1) {
      returnValue = function_.apply(this, arguments_);
      function_ = void 0;
    } else if (options.throw === true) {
      throw new Error(`Function \`${functionName}\` can only be called once`);
    }
    return returnValue;
  };
  mimicFunction(onetime2, function_);
  calledFunctions.set(onetime2, callCount);
  return onetime2;
};
onetime.callCount = (function_) => {
  if (!calledFunctions.has(function_)) {
    throw new Error(`The given function \`${function_.name}\` is not wrapped by the \`onetime\` package`);
  }
  return calledFunctions.get(function_);
};
var onetime_default = onetime;

// node_modules/.pnpm/signal-exit@4.1.0/node_modules/signal-exit/dist/mjs/signals.js
var signals = [];
signals.push("SIGHUP", "SIGINT", "SIGTERM");
if (process.platform !== "win32") {
  signals.push(
    "SIGALRM",
    "SIGABRT",
    "SIGVTALRM",
    "SIGXCPU",
    "SIGXFSZ",
    "SIGUSR2",
    "SIGTRAP",
    "SIGSYS",
    "SIGQUIT",
    "SIGIOT"
    // should detect profiler and enable/disable accordingly.
    // see #21
    // 'SIGPROF'
  );
}
if (process.platform === "linux") {
  signals.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT");
}

// node_modules/.pnpm/signal-exit@4.1.0/node_modules/signal-exit/dist/mjs/index.js
var processOk = (process10) => !!process10 && typeof process10 === "object" && typeof process10.removeListener === "function" && typeof process10.emit === "function" && typeof process10.reallyExit === "function" && typeof process10.listeners === "function" && typeof process10.kill === "function" && typeof process10.pid === "number" && typeof process10.on === "function";
var kExitEmitter = Symbol.for("signal-exit emitter");
var global = globalThis;
var ObjectDefineProperty = Object.defineProperty.bind(Object);
var Emitter = class {
  emitted = {
    afterExit: false,
    exit: false
  };
  listeners = {
    afterExit: [],
    exit: []
  };
  count = 0;
  id = Math.random();
  constructor() {
    if (global[kExitEmitter]) {
      return global[kExitEmitter];
    }
    ObjectDefineProperty(global, kExitEmitter, {
      value: this,
      writable: false,
      enumerable: false,
      configurable: false
    });
  }
  on(ev, fn) {
    this.listeners[ev].push(fn);
  }
  removeListener(ev, fn) {
    const list = this.listeners[ev];
    const i = list.indexOf(fn);
    if (i === -1) {
      return;
    }
    if (i === 0 && list.length === 1) {
      list.length = 0;
    } else {
      list.splice(i, 1);
    }
  }
  emit(ev, code, signal) {
    if (this.emitted[ev]) {
      return false;
    }
    this.emitted[ev] = true;
    let ret = false;
    for (const fn of this.listeners[ev]) {
      ret = fn(code, signal) === true || ret;
    }
    if (ev === "exit") {
      ret = this.emit("afterExit", code, signal) || ret;
    }
    return ret;
  }
};
var SignalExitBase = class {
};
var signalExitWrap = (handler) => {
  return {
    onExit(cb, opts) {
      return handler.onExit(cb, opts);
    },
    load() {
      return handler.load();
    },
    unload() {
      return handler.unload();
    }
  };
};
var SignalExitFallback = class extends SignalExitBase {
  onExit() {
    return () => {
    };
  }
  load() {
  }
  unload() {
  }
};
var SignalExit = class extends SignalExitBase {
  // "SIGHUP" throws an `ENOSYS` error on Windows,
  // so use a supported signal instead
  /* c8 ignore start */
  #hupSig = process5.platform === "win32" ? "SIGINT" : "SIGHUP";
  /* c8 ignore stop */
  #emitter = new Emitter();
  #process;
  #originalProcessEmit;
  #originalProcessReallyExit;
  #sigListeners = {};
  #loaded = false;
  constructor(process10) {
    super();
    this.#process = process10;
    this.#sigListeners = {};
    for (const sig of signals) {
      this.#sigListeners[sig] = () => {
        const listeners = this.#process.listeners(sig);
        let { count } = this.#emitter;
        const p = process10;
        if (typeof p.__signal_exit_emitter__ === "object" && typeof p.__signal_exit_emitter__.count === "number") {
          count += p.__signal_exit_emitter__.count;
        }
        if (listeners.length === count) {
          this.unload();
          const ret = this.#emitter.emit("exit", null, sig);
          const s = sig === "SIGHUP" ? this.#hupSig : sig;
          if (!ret)
            process10.kill(process10.pid, s);
        }
      };
    }
    this.#originalProcessReallyExit = process10.reallyExit;
    this.#originalProcessEmit = process10.emit;
  }
  onExit(cb, opts) {
    if (!processOk(this.#process)) {
      return () => {
      };
    }
    if (this.#loaded === false) {
      this.load();
    }
    const ev = opts?.alwaysLast ? "afterExit" : "exit";
    this.#emitter.on(ev, cb);
    return () => {
      this.#emitter.removeListener(ev, cb);
      if (this.#emitter.listeners["exit"].length === 0 && this.#emitter.listeners["afterExit"].length === 0) {
        this.unload();
      }
    };
  }
  load() {
    if (this.#loaded) {
      return;
    }
    this.#loaded = true;
    this.#emitter.count += 1;
    for (const sig of signals) {
      try {
        const fn = this.#sigListeners[sig];
        if (fn)
          this.#process.on(sig, fn);
      } catch (_) {
      }
    }
    this.#process.emit = (ev, ...a) => {
      return this.#processEmit(ev, ...a);
    };
    this.#process.reallyExit = (code) => {
      return this.#processReallyExit(code);
    };
  }
  unload() {
    if (!this.#loaded) {
      return;
    }
    this.#loaded = false;
    signals.forEach((sig) => {
      const listener = this.#sigListeners[sig];
      if (!listener) {
        throw new Error("Listener not defined for signal: " + sig);
      }
      try {
        this.#process.removeListener(sig, listener);
      } catch (_) {
      }
    });
    this.#process.emit = this.#originalProcessEmit;
    this.#process.reallyExit = this.#originalProcessReallyExit;
    this.#emitter.count -= 1;
  }
  #processReallyExit(code) {
    if (!processOk(this.#process)) {
      return 0;
    }
    this.#process.exitCode = code || 0;
    this.#emitter.emit("exit", this.#process.exitCode, null);
    return this.#originalProcessReallyExit.call(this.#process, this.#process.exitCode);
  }
  #processEmit(ev, ...args) {
    const og = this.#originalProcessEmit;
    if (ev === "exit" && processOk(this.#process)) {
      if (typeof args[0] === "number") {
        this.#process.exitCode = args[0];
      }
      const ret = og.call(this.#process, ev, ...args);
      this.#emitter.emit("exit", this.#process.exitCode, null);
      return ret;
    } else {
      return og.call(this.#process, ev, ...args);
    }
  }
};
var process5 = globalThis.process;
var {
  /**
   * Called when the process is exiting, whether via signal, explicit
   * exit, or running out of stuff to do.
   *
   * If the global process object is not suitable for instrumentation,
   * then this will be a no-op.
   *
   * Returns a function that may be used to unload signal-exit.
   */
  onExit,
  /**
   * Load the listeners.  Likely you never need to call this, unless
   * doing a rather deep integration with signal-exit functionality.
   * Mostly exposed for the benefit of testing.
   *
   * @internal
   */
  load,
  /**
   * Unload the listeners.  Likely you never need to call this, unless
   * doing a rather deep integration with signal-exit functionality.
   * Mostly exposed for the benefit of testing.
   *
   * @internal
   */
  unload
} = signalExitWrap(processOk(process5) ? new SignalExit(process5) : new SignalExitFallback());

// node_modules/.pnpm/restore-cursor@5.1.0/node_modules/restore-cursor/index.js
var terminal = import_node_process4.default.stderr.isTTY ? import_node_process4.default.stderr : import_node_process4.default.stdout.isTTY ? import_node_process4.default.stdout : void 0;
var restoreCursor = terminal ? onetime_default(() => {
  onExit(() => {
    terminal.write("\x1B[?25h");
  }, { alwaysLast: true });
}) : () => {
};
var restore_cursor_default = restoreCursor;

// node_modules/.pnpm/cli-cursor@5.0.0/node_modules/cli-cursor/index.js
var isHidden = false;
var cliCursor = {};
cliCursor.show = (writableStream = import_node_process5.default.stderr) => {
  if (!writableStream.isTTY) {
    return;
  }
  isHidden = false;
  writableStream.write("\x1B[?25h");
};
cliCursor.hide = (writableStream = import_node_process5.default.stderr) => {
  if (!writableStream.isTTY) {
    return;
  }
  restore_cursor_default();
  isHidden = true;
  writableStream.write("\x1B[?25l");
};
cliCursor.toggle = (force, writableStream) => {
  if (force !== void 0) {
    isHidden = force;
  }
  if (isHidden) {
    cliCursor.show(writableStream);
  } else {
    cliCursor.hide(writableStream);
  }
};
var cli_cursor_default = cliCursor;

// node_modules/.pnpm/cli-spinners@3.4.0/node_modules/cli-spinners/spinners.json
var spinners_default = {
  dots: {
    interval: 80,
    frames: [
      "\u280B",
      "\u2819",
      "\u2839",
      "\u2838",
      "\u283C",
      "\u2834",
      "\u2826",
      "\u2827",
      "\u2807",
      "\u280F"
    ]
  },
  dots2: {
    interval: 80,
    frames: [
      "\u28FE",
      "\u28FD",
      "\u28FB",
      "\u28BF",
      "\u287F",
      "\u28DF",
      "\u28EF",
      "\u28F7"
    ]
  },
  dots3: {
    interval: 80,
    frames: [
      "\u280B",
      "\u2819",
      "\u281A",
      "\u281E",
      "\u2816",
      "\u2826",
      "\u2834",
      "\u2832",
      "\u2833",
      "\u2813"
    ]
  },
  dots4: {
    interval: 80,
    frames: [
      "\u2804",
      "\u2806",
      "\u2807",
      "\u280B",
      "\u2819",
      "\u2838",
      "\u2830",
      "\u2820",
      "\u2830",
      "\u2838",
      "\u2819",
      "\u280B",
      "\u2807",
      "\u2806"
    ]
  },
  dots5: {
    interval: 80,
    frames: [
      "\u280B",
      "\u2819",
      "\u281A",
      "\u2812",
      "\u2802",
      "\u2802",
      "\u2812",
      "\u2832",
      "\u2834",
      "\u2826",
      "\u2816",
      "\u2812",
      "\u2810",
      "\u2810",
      "\u2812",
      "\u2813",
      "\u280B"
    ]
  },
  dots6: {
    interval: 80,
    frames: [
      "\u2801",
      "\u2809",
      "\u2819",
      "\u281A",
      "\u2812",
      "\u2802",
      "\u2802",
      "\u2812",
      "\u2832",
      "\u2834",
      "\u2824",
      "\u2804",
      "\u2804",
      "\u2824",
      "\u2834",
      "\u2832",
      "\u2812",
      "\u2802",
      "\u2802",
      "\u2812",
      "\u281A",
      "\u2819",
      "\u2809",
      "\u2801"
    ]
  },
  dots7: {
    interval: 80,
    frames: [
      "\u2808",
      "\u2809",
      "\u280B",
      "\u2813",
      "\u2812",
      "\u2810",
      "\u2810",
      "\u2812",
      "\u2816",
      "\u2826",
      "\u2824",
      "\u2820",
      "\u2820",
      "\u2824",
      "\u2826",
      "\u2816",
      "\u2812",
      "\u2810",
      "\u2810",
      "\u2812",
      "\u2813",
      "\u280B",
      "\u2809",
      "\u2808"
    ]
  },
  dots8: {
    interval: 80,
    frames: [
      "\u2801",
      "\u2801",
      "\u2809",
      "\u2819",
      "\u281A",
      "\u2812",
      "\u2802",
      "\u2802",
      "\u2812",
      "\u2832",
      "\u2834",
      "\u2824",
      "\u2804",
      "\u2804",
      "\u2824",
      "\u2820",
      "\u2820",
      "\u2824",
      "\u2826",
      "\u2816",
      "\u2812",
      "\u2810",
      "\u2810",
      "\u2812",
      "\u2813",
      "\u280B",
      "\u2809",
      "\u2808",
      "\u2808"
    ]
  },
  dots9: {
    interval: 80,
    frames: [
      "\u28B9",
      "\u28BA",
      "\u28BC",
      "\u28F8",
      "\u28C7",
      "\u2867",
      "\u2857",
      "\u284F"
    ]
  },
  dots10: {
    interval: 80,
    frames: [
      "\u2884",
      "\u2882",
      "\u2881",
      "\u2841",
      "\u2848",
      "\u2850",
      "\u2860"
    ]
  },
  dots11: {
    interval: 100,
    frames: [
      "\u2801",
      "\u2802",
      "\u2804",
      "\u2840",
      "\u2880",
      "\u2820",
      "\u2810",
      "\u2808"
    ]
  },
  dots12: {
    interval: 80,
    frames: [
      "\u2880\u2800",
      "\u2840\u2800",
      "\u2804\u2800",
      "\u2882\u2800",
      "\u2842\u2800",
      "\u2805\u2800",
      "\u2883\u2800",
      "\u2843\u2800",
      "\u280D\u2800",
      "\u288B\u2800",
      "\u284B\u2800",
      "\u280D\u2801",
      "\u288B\u2801",
      "\u284B\u2801",
      "\u280D\u2809",
      "\u280B\u2809",
      "\u280B\u2809",
      "\u2809\u2819",
      "\u2809\u2819",
      "\u2809\u2829",
      "\u2808\u2899",
      "\u2808\u2859",
      "\u2888\u2829",
      "\u2840\u2899",
      "\u2804\u2859",
      "\u2882\u2829",
      "\u2842\u2898",
      "\u2805\u2858",
      "\u2883\u2828",
      "\u2843\u2890",
      "\u280D\u2850",
      "\u288B\u2820",
      "\u284B\u2880",
      "\u280D\u2841",
      "\u288B\u2801",
      "\u284B\u2801",
      "\u280D\u2809",
      "\u280B\u2809",
      "\u280B\u2809",
      "\u2809\u2819",
      "\u2809\u2819",
      "\u2809\u2829",
      "\u2808\u2899",
      "\u2808\u2859",
      "\u2808\u2829",
      "\u2800\u2899",
      "\u2800\u2859",
      "\u2800\u2829",
      "\u2800\u2898",
      "\u2800\u2858",
      "\u2800\u2828",
      "\u2800\u2890",
      "\u2800\u2850",
      "\u2800\u2820",
      "\u2800\u2880",
      "\u2800\u2840"
    ]
  },
  dots13: {
    interval: 80,
    frames: [
      "\u28FC",
      "\u28F9",
      "\u28BB",
      "\u283F",
      "\u285F",
      "\u28CF",
      "\u28E7",
      "\u28F6"
    ]
  },
  dots14: {
    interval: 80,
    frames: [
      "\u2809\u2809",
      "\u2808\u2819",
      "\u2800\u2839",
      "\u2800\u28B8",
      "\u2800\u28F0",
      "\u2880\u28E0",
      "\u28C0\u28C0",
      "\u28C4\u2840",
      "\u28C6\u2800",
      "\u2847\u2800",
      "\u280F\u2800",
      "\u280B\u2801"
    ]
  },
  dots8Bit: {
    interval: 80,
    frames: [
      "\u2800",
      "\u2801",
      "\u2802",
      "\u2803",
      "\u2804",
      "\u2805",
      "\u2806",
      "\u2807",
      "\u2840",
      "\u2841",
      "\u2842",
      "\u2843",
      "\u2844",
      "\u2845",
      "\u2846",
      "\u2847",
      "\u2808",
      "\u2809",
      "\u280A",
      "\u280B",
      "\u280C",
      "\u280D",
      "\u280E",
      "\u280F",
      "\u2848",
      "\u2849",
      "\u284A",
      "\u284B",
      "\u284C",
      "\u284D",
      "\u284E",
      "\u284F",
      "\u2810",
      "\u2811",
      "\u2812",
      "\u2813",
      "\u2814",
      "\u2815",
      "\u2816",
      "\u2817",
      "\u2850",
      "\u2851",
      "\u2852",
      "\u2853",
      "\u2854",
      "\u2855",
      "\u2856",
      "\u2857",
      "\u2818",
      "\u2819",
      "\u281A",
      "\u281B",
      "\u281C",
      "\u281D",
      "\u281E",
      "\u281F",
      "\u2858",
      "\u2859",
      "\u285A",
      "\u285B",
      "\u285C",
      "\u285D",
      "\u285E",
      "\u285F",
      "\u2820",
      "\u2821",
      "\u2822",
      "\u2823",
      "\u2824",
      "\u2825",
      "\u2826",
      "\u2827",
      "\u2860",
      "\u2861",
      "\u2862",
      "\u2863",
      "\u2864",
      "\u2865",
      "\u2866",
      "\u2867",
      "\u2828",
      "\u2829",
      "\u282A",
      "\u282B",
      "\u282C",
      "\u282D",
      "\u282E",
      "\u282F",
      "\u2868",
      "\u2869",
      "\u286A",
      "\u286B",
      "\u286C",
      "\u286D",
      "\u286E",
      "\u286F",
      "\u2830",
      "\u2831",
      "\u2832",
      "\u2833",
      "\u2834",
      "\u2835",
      "\u2836",
      "\u2837",
      "\u2870",
      "\u2871",
      "\u2872",
      "\u2873",
      "\u2874",
      "\u2875",
      "\u2876",
      "\u2877",
      "\u2838",
      "\u2839",
      "\u283A",
      "\u283B",
      "\u283C",
      "\u283D",
      "\u283E",
      "\u283F",
      "\u2878",
      "\u2879",
      "\u287A",
      "\u287B",
      "\u287C",
      "\u287D",
      "\u287E",
      "\u287F",
      "\u2880",
      "\u2881",
      "\u2882",
      "\u2883",
      "\u2884",
      "\u2885",
      "\u2886",
      "\u2887",
      "\u28C0",
      "\u28C1",
      "\u28C2",
      "\u28C3",
      "\u28C4",
      "\u28C5",
      "\u28C6",
      "\u28C7",
      "\u2888",
      "\u2889",
      "\u288A",
      "\u288B",
      "\u288C",
      "\u288D",
      "\u288E",
      "\u288F",
      "\u28C8",
      "\u28C9",
      "\u28CA",
      "\u28CB",
      "\u28CC",
      "\u28CD",
      "\u28CE",
      "\u28CF",
      "\u2890",
      "\u2891",
      "\u2892",
      "\u2893",
      "\u2894",
      "\u2895",
      "\u2896",
      "\u2897",
      "\u28D0",
      "\u28D1",
      "\u28D2",
      "\u28D3",
      "\u28D4",
      "\u28D5",
      "\u28D6",
      "\u28D7",
      "\u2898",
      "\u2899",
      "\u289A",
      "\u289B",
      "\u289C",
      "\u289D",
      "\u289E",
      "\u289F",
      "\u28D8",
      "\u28D9",
      "\u28DA",
      "\u28DB",
      "\u28DC",
      "\u28DD",
      "\u28DE",
      "\u28DF",
      "\u28A0",
      "\u28A1",
      "\u28A2",
      "\u28A3",
      "\u28A4",
      "\u28A5",
      "\u28A6",
      "\u28A7",
      "\u28E0",
      "\u28E1",
      "\u28E2",
      "\u28E3",
      "\u28E4",
      "\u28E5",
      "\u28E6",
      "\u28E7",
      "\u28A8",
      "\u28A9",
      "\u28AA",
      "\u28AB",
      "\u28AC",
      "\u28AD",
      "\u28AE",
      "\u28AF",
      "\u28E8",
      "\u28E9",
      "\u28EA",
      "\u28EB",
      "\u28EC",
      "\u28ED",
      "\u28EE",
      "\u28EF",
      "\u28B0",
      "\u28B1",
      "\u28B2",
      "\u28B3",
      "\u28B4",
      "\u28B5",
      "\u28B6",
      "\u28B7",
      "\u28F0",
      "\u28F1",
      "\u28F2",
      "\u28F3",
      "\u28F4",
      "\u28F5",
      "\u28F6",
      "\u28F7",
      "\u28B8",
      "\u28B9",
      "\u28BA",
      "\u28BB",
      "\u28BC",
      "\u28BD",
      "\u28BE",
      "\u28BF",
      "\u28F8",
      "\u28F9",
      "\u28FA",
      "\u28FB",
      "\u28FC",
      "\u28FD",
      "\u28FE",
      "\u28FF"
    ]
  },
  dotsCircle: {
    interval: 80,
    frames: [
      "\u288E ",
      "\u280E\u2801",
      "\u280A\u2811",
      "\u2808\u2831",
      " \u2871",
      "\u2880\u2870",
      "\u2884\u2860",
      "\u2886\u2840"
    ]
  },
  sand: {
    interval: 80,
    frames: [
      "\u2801",
      "\u2802",
      "\u2804",
      "\u2840",
      "\u2848",
      "\u2850",
      "\u2860",
      "\u28C0",
      "\u28C1",
      "\u28C2",
      "\u28C4",
      "\u28CC",
      "\u28D4",
      "\u28E4",
      "\u28E5",
      "\u28E6",
      "\u28EE",
      "\u28F6",
      "\u28F7",
      "\u28FF",
      "\u287F",
      "\u283F",
      "\u289F",
      "\u281F",
      "\u285B",
      "\u281B",
      "\u282B",
      "\u288B",
      "\u280B",
      "\u280D",
      "\u2849",
      "\u2809",
      "\u2811",
      "\u2821",
      "\u2881"
    ]
  },
  line: {
    interval: 130,
    frames: [
      "-",
      "\\",
      "|",
      "/"
    ]
  },
  line2: {
    interval: 100,
    frames: [
      "\u2802",
      "-",
      "\u2013",
      "\u2014",
      "\u2013",
      "-"
    ]
  },
  rollingLine: {
    interval: 80,
    frames: [
      "/  ",
      " - ",
      " \\ ",
      "  |",
      "  |",
      " \\ ",
      " - ",
      "/  "
    ]
  },
  pipe: {
    interval: 100,
    frames: [
      "\u2524",
      "\u2518",
      "\u2534",
      "\u2514",
      "\u251C",
      "\u250C",
      "\u252C",
      "\u2510"
    ]
  },
  simpleDots: {
    interval: 400,
    frames: [
      ".  ",
      ".. ",
      "...",
      "   "
    ]
  },
  simpleDotsScrolling: {
    interval: 200,
    frames: [
      ".  ",
      ".. ",
      "...",
      " ..",
      "  .",
      "   "
    ]
  },
  star: {
    interval: 70,
    frames: [
      "\u2736",
      "\u2738",
      "\u2739",
      "\u273A",
      "\u2739",
      "\u2737"
    ]
  },
  star2: {
    interval: 80,
    frames: [
      "+",
      "x",
      "*"
    ]
  },
  flip: {
    interval: 70,
    frames: [
      "_",
      "_",
      "_",
      "-",
      "`",
      "`",
      "'",
      "\xB4",
      "-",
      "_",
      "_",
      "_"
    ]
  },
  hamburger: {
    interval: 100,
    frames: [
      "\u2631",
      "\u2632",
      "\u2634"
    ]
  },
  growVertical: {
    interval: 120,
    frames: [
      "\u2581",
      "\u2583",
      "\u2584",
      "\u2585",
      "\u2586",
      "\u2587",
      "\u2586",
      "\u2585",
      "\u2584",
      "\u2583"
    ]
  },
  growHorizontal: {
    interval: 120,
    frames: [
      "\u258F",
      "\u258E",
      "\u258D",
      "\u258C",
      "\u258B",
      "\u258A",
      "\u2589",
      "\u258A",
      "\u258B",
      "\u258C",
      "\u258D",
      "\u258E"
    ]
  },
  balloon: {
    interval: 140,
    frames: [
      " ",
      ".",
      "o",
      "O",
      "@",
      "*",
      " "
    ]
  },
  balloon2: {
    interval: 120,
    frames: [
      ".",
      "o",
      "O",
      "\xB0",
      "O",
      "o",
      "."
    ]
  },
  noise: {
    interval: 100,
    frames: [
      "\u2593",
      "\u2592",
      "\u2591"
    ]
  },
  bounce: {
    interval: 120,
    frames: [
      "\u2801",
      "\u2802",
      "\u2804",
      "\u2802"
    ]
  },
  boxBounce: {
    interval: 120,
    frames: [
      "\u2596",
      "\u2598",
      "\u259D",
      "\u2597"
    ]
  },
  boxBounce2: {
    interval: 100,
    frames: [
      "\u258C",
      "\u2580",
      "\u2590",
      "\u2584"
    ]
  },
  triangle: {
    interval: 50,
    frames: [
      "\u25E2",
      "\u25E3",
      "\u25E4",
      "\u25E5"
    ]
  },
  binary: {
    interval: 80,
    frames: [
      "010010",
      "001100",
      "100101",
      "111010",
      "111101",
      "010111",
      "101011",
      "111000",
      "110011",
      "110101"
    ]
  },
  arc: {
    interval: 100,
    frames: [
      "\u25DC",
      "\u25E0",
      "\u25DD",
      "\u25DE",
      "\u25E1",
      "\u25DF"
    ]
  },
  circle: {
    interval: 120,
    frames: [
      "\u25E1",
      "\u2299",
      "\u25E0"
    ]
  },
  squareCorners: {
    interval: 180,
    frames: [
      "\u25F0",
      "\u25F3",
      "\u25F2",
      "\u25F1"
    ]
  },
  circleQuarters: {
    interval: 120,
    frames: [
      "\u25F4",
      "\u25F7",
      "\u25F6",
      "\u25F5"
    ]
  },
  circleHalves: {
    interval: 50,
    frames: [
      "\u25D0",
      "\u25D3",
      "\u25D1",
      "\u25D2"
    ]
  },
  squish: {
    interval: 100,
    frames: [
      "\u256B",
      "\u256A"
    ]
  },
  toggle: {
    interval: 250,
    frames: [
      "\u22B6",
      "\u22B7"
    ]
  },
  toggle2: {
    interval: 80,
    frames: [
      "\u25AB",
      "\u25AA"
    ]
  },
  toggle3: {
    interval: 120,
    frames: [
      "\u25A1",
      "\u25A0"
    ]
  },
  toggle4: {
    interval: 100,
    frames: [
      "\u25A0",
      "\u25A1",
      "\u25AA",
      "\u25AB"
    ]
  },
  toggle5: {
    interval: 100,
    frames: [
      "\u25AE",
      "\u25AF"
    ]
  },
  toggle6: {
    interval: 300,
    frames: [
      "\u101D",
      "\u1040"
    ]
  },
  toggle7: {
    interval: 80,
    frames: [
      "\u29BE",
      "\u29BF"
    ]
  },
  toggle8: {
    interval: 100,
    frames: [
      "\u25CD",
      "\u25CC"
    ]
  },
  toggle9: {
    interval: 100,
    frames: [
      "\u25C9",
      "\u25CE"
    ]
  },
  toggle10: {
    interval: 100,
    frames: [
      "\u3282",
      "\u3280",
      "\u3281"
    ]
  },
  toggle11: {
    interval: 50,
    frames: [
      "\u29C7",
      "\u29C6"
    ]
  },
  toggle12: {
    interval: 120,
    frames: [
      "\u2617",
      "\u2616"
    ]
  },
  toggle13: {
    interval: 80,
    frames: [
      "=",
      "*",
      "-"
    ]
  },
  arrow: {
    interval: 100,
    frames: [
      "\u2190",
      "\u2196",
      "\u2191",
      "\u2197",
      "\u2192",
      "\u2198",
      "\u2193",
      "\u2199"
    ]
  },
  arrow2: {
    interval: 80,
    frames: [
      "\u2B06\uFE0F ",
      "\u2197\uFE0F ",
      "\u27A1\uFE0F ",
      "\u2198\uFE0F ",
      "\u2B07\uFE0F ",
      "\u2199\uFE0F ",
      "\u2B05\uFE0F ",
      "\u2196\uFE0F "
    ]
  },
  arrow3: {
    interval: 120,
    frames: [
      "\u25B9\u25B9\u25B9\u25B9\u25B9",
      "\u25B8\u25B9\u25B9\u25B9\u25B9",
      "\u25B9\u25B8\u25B9\u25B9\u25B9",
      "\u25B9\u25B9\u25B8\u25B9\u25B9",
      "\u25B9\u25B9\u25B9\u25B8\u25B9",
      "\u25B9\u25B9\u25B9\u25B9\u25B8"
    ]
  },
  bouncingBar: {
    interval: 80,
    frames: [
      "[    ]",
      "[=   ]",
      "[==  ]",
      "[=== ]",
      "[====]",
      "[ ===]",
      "[  ==]",
      "[   =]",
      "[    ]",
      "[   =]",
      "[  ==]",
      "[ ===]",
      "[====]",
      "[=== ]",
      "[==  ]",
      "[=   ]"
    ]
  },
  bouncingBall: {
    interval: 80,
    frames: [
      "( \u25CF    )",
      "(  \u25CF   )",
      "(   \u25CF  )",
      "(    \u25CF )",
      "(     \u25CF)",
      "(    \u25CF )",
      "(   \u25CF  )",
      "(  \u25CF   )",
      "( \u25CF    )",
      "(\u25CF     )"
    ]
  },
  smiley: {
    interval: 200,
    frames: [
      "\u{1F604} ",
      "\u{1F61D} "
    ]
  },
  monkey: {
    interval: 300,
    frames: [
      "\u{1F648} ",
      "\u{1F648} ",
      "\u{1F649} ",
      "\u{1F64A} "
    ]
  },
  hearts: {
    interval: 100,
    frames: [
      "\u{1F49B} ",
      "\u{1F499} ",
      "\u{1F49C} ",
      "\u{1F49A} ",
      "\u{1F497} "
    ]
  },
  clock: {
    interval: 100,
    frames: [
      "\u{1F55B} ",
      "\u{1F550} ",
      "\u{1F551} ",
      "\u{1F552} ",
      "\u{1F553} ",
      "\u{1F554} ",
      "\u{1F555} ",
      "\u{1F556} ",
      "\u{1F557} ",
      "\u{1F558} ",
      "\u{1F559} ",
      "\u{1F55A} "
    ]
  },
  earth: {
    interval: 180,
    frames: [
      "\u{1F30D} ",
      "\u{1F30E} ",
      "\u{1F30F} "
    ]
  },
  material: {
    interval: 17,
    frames: [
      "\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581",
      "\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581",
      "\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581",
      "\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581",
      "\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
      "\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
      "\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581",
      "\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581",
      "\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
      "\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
      "\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588",
      "\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588",
      "\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588",
      "\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588",
      "\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588",
      "\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588",
      "\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588",
      "\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581",
      "\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581",
      "\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581",
      "\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
      "\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581"
    ]
  },
  moon: {
    interval: 80,
    frames: [
      "\u{1F311} ",
      "\u{1F312} ",
      "\u{1F313} ",
      "\u{1F314} ",
      "\u{1F315} ",
      "\u{1F316} ",
      "\u{1F317} ",
      "\u{1F318} "
    ]
  },
  runner: {
    interval: 140,
    frames: [
      "\u{1F6B6} ",
      "\u{1F3C3} "
    ]
  },
  pong: {
    interval: 80,
    frames: [
      "\u2590\u2802       \u258C",
      "\u2590\u2808       \u258C",
      "\u2590 \u2802      \u258C",
      "\u2590 \u2820      \u258C",
      "\u2590  \u2840     \u258C",
      "\u2590  \u2820     \u258C",
      "\u2590   \u2802    \u258C",
      "\u2590   \u2808    \u258C",
      "\u2590    \u2802   \u258C",
      "\u2590    \u2820   \u258C",
      "\u2590     \u2840  \u258C",
      "\u2590     \u2820  \u258C",
      "\u2590      \u2802 \u258C",
      "\u2590      \u2808 \u258C",
      "\u2590       \u2802\u258C",
      "\u2590       \u2820\u258C",
      "\u2590       \u2840\u258C",
      "\u2590      \u2820 \u258C",
      "\u2590      \u2802 \u258C",
      "\u2590     \u2808  \u258C",
      "\u2590     \u2802  \u258C",
      "\u2590    \u2820   \u258C",
      "\u2590    \u2840   \u258C",
      "\u2590   \u2820    \u258C",
      "\u2590   \u2802    \u258C",
      "\u2590  \u2808     \u258C",
      "\u2590  \u2802     \u258C",
      "\u2590 \u2820      \u258C",
      "\u2590 \u2840      \u258C",
      "\u2590\u2820       \u258C"
    ]
  },
  shark: {
    interval: 120,
    frames: [
      "\u2590|\\____________\u258C",
      "\u2590_|\\___________\u258C",
      "\u2590__|\\__________\u258C",
      "\u2590___|\\_________\u258C",
      "\u2590____|\\________\u258C",
      "\u2590_____|\\_______\u258C",
      "\u2590______|\\______\u258C",
      "\u2590_______|\\_____\u258C",
      "\u2590________|\\____\u258C",
      "\u2590_________|\\___\u258C",
      "\u2590__________|\\__\u258C",
      "\u2590___________|\\_\u258C",
      "\u2590____________|\\\u258C",
      "\u2590____________/|\u258C",
      "\u2590___________/|_\u258C",
      "\u2590__________/|__\u258C",
      "\u2590_________/|___\u258C",
      "\u2590________/|____\u258C",
      "\u2590_______/|_____\u258C",
      "\u2590______/|______\u258C",
      "\u2590_____/|_______\u258C",
      "\u2590____/|________\u258C",
      "\u2590___/|_________\u258C",
      "\u2590__/|__________\u258C",
      "\u2590_/|___________\u258C",
      "\u2590/|____________\u258C"
    ]
  },
  dqpb: {
    interval: 100,
    frames: [
      "d",
      "q",
      "p",
      "b"
    ]
  },
  weather: {
    interval: 100,
    frames: [
      "\u2600\uFE0F ",
      "\u2600\uFE0F ",
      "\u2600\uFE0F ",
      "\u{1F324} ",
      "\u26C5\uFE0F ",
      "\u{1F325} ",
      "\u2601\uFE0F ",
      "\u{1F327} ",
      "\u{1F328} ",
      "\u{1F327} ",
      "\u{1F328} ",
      "\u{1F327} ",
      "\u{1F328} ",
      "\u26C8 ",
      "\u{1F328} ",
      "\u{1F327} ",
      "\u{1F328} ",
      "\u2601\uFE0F ",
      "\u{1F325} ",
      "\u26C5\uFE0F ",
      "\u{1F324} ",
      "\u2600\uFE0F ",
      "\u2600\uFE0F "
    ]
  },
  christmas: {
    interval: 400,
    frames: [
      "\u{1F332}",
      "\u{1F384}"
    ]
  },
  grenade: {
    interval: 80,
    frames: [
      "\u060C  ",
      "\u2032  ",
      " \xB4 ",
      " \u203E ",
      "  \u2E0C",
      "  \u2E0A",
      "  |",
      "  \u204E",
      "  \u2055",
      " \u0DF4 ",
      "  \u2053",
      "   ",
      "   ",
      "   "
    ]
  },
  point: {
    interval: 125,
    frames: [
      "\u2219\u2219\u2219",
      "\u25CF\u2219\u2219",
      "\u2219\u25CF\u2219",
      "\u2219\u2219\u25CF",
      "\u2219\u2219\u2219"
    ]
  },
  layer: {
    interval: 150,
    frames: [
      "-",
      "=",
      "\u2261"
    ]
  },
  betaWave: {
    interval: 80,
    frames: [
      "\u03C1\u03B2\u03B2\u03B2\u03B2\u03B2\u03B2",
      "\u03B2\u03C1\u03B2\u03B2\u03B2\u03B2\u03B2",
      "\u03B2\u03B2\u03C1\u03B2\u03B2\u03B2\u03B2",
      "\u03B2\u03B2\u03B2\u03C1\u03B2\u03B2\u03B2",
      "\u03B2\u03B2\u03B2\u03B2\u03C1\u03B2\u03B2",
      "\u03B2\u03B2\u03B2\u03B2\u03B2\u03C1\u03B2",
      "\u03B2\u03B2\u03B2\u03B2\u03B2\u03B2\u03C1"
    ]
  },
  fingerDance: {
    interval: 160,
    frames: [
      "\u{1F918} ",
      "\u{1F91F} ",
      "\u{1F596} ",
      "\u270B ",
      "\u{1F91A} ",
      "\u{1F446} "
    ]
  },
  fistBump: {
    interval: 80,
    frames: [
      "\u{1F91C}\u3000\u3000\u3000\u3000\u{1F91B} ",
      "\u{1F91C}\u3000\u3000\u3000\u3000\u{1F91B} ",
      "\u{1F91C}\u3000\u3000\u3000\u3000\u{1F91B} ",
      "\u3000\u{1F91C}\u3000\u3000\u{1F91B}\u3000 ",
      "\u3000\u3000\u{1F91C}\u{1F91B}\u3000\u3000 ",
      "\u3000\u{1F91C}\u2728\u{1F91B}\u3000\u3000 ",
      "\u{1F91C}\u3000\u2728\u3000\u{1F91B}\u3000 "
    ]
  },
  soccerHeader: {
    interval: 80,
    frames: [
      " \u{1F9D1}\u26BD\uFE0F       \u{1F9D1} ",
      "\u{1F9D1}  \u26BD\uFE0F      \u{1F9D1} ",
      "\u{1F9D1}   \u26BD\uFE0F     \u{1F9D1} ",
      "\u{1F9D1}    \u26BD\uFE0F    \u{1F9D1} ",
      "\u{1F9D1}     \u26BD\uFE0F   \u{1F9D1} ",
      "\u{1F9D1}      \u26BD\uFE0F  \u{1F9D1} ",
      "\u{1F9D1}       \u26BD\uFE0F\u{1F9D1}  ",
      "\u{1F9D1}      \u26BD\uFE0F  \u{1F9D1} ",
      "\u{1F9D1}     \u26BD\uFE0F   \u{1F9D1} ",
      "\u{1F9D1}    \u26BD\uFE0F    \u{1F9D1} ",
      "\u{1F9D1}   \u26BD\uFE0F     \u{1F9D1} ",
      "\u{1F9D1}  \u26BD\uFE0F      \u{1F9D1} "
    ]
  },
  mindblown: {
    interval: 160,
    frames: [
      "\u{1F610} ",
      "\u{1F610} ",
      "\u{1F62E} ",
      "\u{1F62E} ",
      "\u{1F626} ",
      "\u{1F626} ",
      "\u{1F627} ",
      "\u{1F627} ",
      "\u{1F92F} ",
      "\u{1F4A5} ",
      "\u2728 ",
      "\u3000 ",
      "\u3000 ",
      "\u3000 "
    ]
  },
  speaker: {
    interval: 160,
    frames: [
      "\u{1F508} ",
      "\u{1F509} ",
      "\u{1F50A} ",
      "\u{1F509} "
    ]
  },
  orangePulse: {
    interval: 100,
    frames: [
      "\u{1F538} ",
      "\u{1F536} ",
      "\u{1F7E0} ",
      "\u{1F7E0} ",
      "\u{1F536} "
    ]
  },
  bluePulse: {
    interval: 100,
    frames: [
      "\u{1F539} ",
      "\u{1F537} ",
      "\u{1F535} ",
      "\u{1F535} ",
      "\u{1F537} "
    ]
  },
  orangeBluePulse: {
    interval: 100,
    frames: [
      "\u{1F538} ",
      "\u{1F536} ",
      "\u{1F7E0} ",
      "\u{1F7E0} ",
      "\u{1F536} ",
      "\u{1F539} ",
      "\u{1F537} ",
      "\u{1F535} ",
      "\u{1F535} ",
      "\u{1F537} "
    ]
  },
  timeTravel: {
    interval: 100,
    frames: [
      "\u{1F55B} ",
      "\u{1F55A} ",
      "\u{1F559} ",
      "\u{1F558} ",
      "\u{1F557} ",
      "\u{1F556} ",
      "\u{1F555} ",
      "\u{1F554} ",
      "\u{1F553} ",
      "\u{1F552} ",
      "\u{1F551} ",
      "\u{1F550} "
    ]
  },
  aesthetic: {
    interval: 80,
    frames: [
      "\u25B0\u25B1\u25B1\u25B1\u25B1\u25B1\u25B1",
      "\u25B0\u25B0\u25B1\u25B1\u25B1\u25B1\u25B1",
      "\u25B0\u25B0\u25B0\u25B1\u25B1\u25B1\u25B1",
      "\u25B0\u25B0\u25B0\u25B0\u25B1\u25B1\u25B1",
      "\u25B0\u25B0\u25B0\u25B0\u25B0\u25B1\u25B1",
      "\u25B0\u25B0\u25B0\u25B0\u25B0\u25B0\u25B1",
      "\u25B0\u25B0\u25B0\u25B0\u25B0\u25B0\u25B0",
      "\u25B0\u25B1\u25B1\u25B1\u25B1\u25B1\u25B1"
    ]
  },
  dwarfFortress: {
    interval: 80,
    frames: [
      " \u2588\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "\u263A\u2588\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "\u263A\u2588\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "\u263A\u2593\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "\u263A\u2593\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "\u263A\u2592\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "\u263A\u2592\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "\u263A\u2591\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "\u263A\u2591\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "\u263A \u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      " \u263A\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      " \u263A\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      " \u263A\u2593\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      " \u263A\u2593\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      " \u263A\u2592\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      " \u263A\u2592\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      " \u263A\u2591\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      " \u263A\u2591\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      " \u263A \u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "  \u263A\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "  \u263A\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "  \u263A\u2593\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "  \u263A\u2593\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "  \u263A\u2592\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "  \u263A\u2592\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "  \u263A\u2591\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "  \u263A\u2591\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "  \u263A \u2588\u2588\u2588\xA3\xA3\xA3  ",
      "   \u263A\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "   \u263A\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "   \u263A\u2593\u2588\u2588\xA3\xA3\xA3  ",
      "   \u263A\u2593\u2588\u2588\xA3\xA3\xA3  ",
      "   \u263A\u2592\u2588\u2588\xA3\xA3\xA3  ",
      "   \u263A\u2592\u2588\u2588\xA3\xA3\xA3  ",
      "   \u263A\u2591\u2588\u2588\xA3\xA3\xA3  ",
      "   \u263A\u2591\u2588\u2588\xA3\xA3\xA3  ",
      "   \u263A \u2588\u2588\xA3\xA3\xA3  ",
      "    \u263A\u2588\u2588\xA3\xA3\xA3  ",
      "    \u263A\u2588\u2588\xA3\xA3\xA3  ",
      "    \u263A\u2593\u2588\xA3\xA3\xA3  ",
      "    \u263A\u2593\u2588\xA3\xA3\xA3  ",
      "    \u263A\u2592\u2588\xA3\xA3\xA3  ",
      "    \u263A\u2592\u2588\xA3\xA3\xA3  ",
      "    \u263A\u2591\u2588\xA3\xA3\xA3  ",
      "    \u263A\u2591\u2588\xA3\xA3\xA3  ",
      "    \u263A \u2588\xA3\xA3\xA3  ",
      "     \u263A\u2588\xA3\xA3\xA3  ",
      "     \u263A\u2588\xA3\xA3\xA3  ",
      "     \u263A\u2593\xA3\xA3\xA3  ",
      "     \u263A\u2593\xA3\xA3\xA3  ",
      "     \u263A\u2592\xA3\xA3\xA3  ",
      "     \u263A\u2592\xA3\xA3\xA3  ",
      "     \u263A\u2591\xA3\xA3\xA3  ",
      "     \u263A\u2591\xA3\xA3\xA3  ",
      "     \u263A \xA3\xA3\xA3  ",
      "      \u263A\xA3\xA3\xA3  ",
      "      \u263A\xA3\xA3\xA3  ",
      "      \u263A\u2593\xA3\xA3  ",
      "      \u263A\u2593\xA3\xA3  ",
      "      \u263A\u2592\xA3\xA3  ",
      "      \u263A\u2592\xA3\xA3  ",
      "      \u263A\u2591\xA3\xA3  ",
      "      \u263A\u2591\xA3\xA3  ",
      "      \u263A \xA3\xA3  ",
      "       \u263A\xA3\xA3  ",
      "       \u263A\xA3\xA3  ",
      "       \u263A\u2593\xA3  ",
      "       \u263A\u2593\xA3  ",
      "       \u263A\u2592\xA3  ",
      "       \u263A\u2592\xA3  ",
      "       \u263A\u2591\xA3  ",
      "       \u263A\u2591\xA3  ",
      "       \u263A \xA3  ",
      "        \u263A\xA3  ",
      "        \u263A\xA3  ",
      "        \u263A\u2593  ",
      "        \u263A\u2593  ",
      "        \u263A\u2592  ",
      "        \u263A\u2592  ",
      "        \u263A\u2591  ",
      "        \u263A\u2591  ",
      "        \u263A   ",
      "        \u263A  &",
      "        \u263A \u263C&",
      "       \u263A \u263C &",
      "       \u263A\u263C  &",
      "      \u263A\u263C  & ",
      "      \u203C   & ",
      "     \u263A   &  ",
      "    \u203C    &  ",
      "   \u263A    &   ",
      "  \u203C     &   ",
      " \u263A     &    ",
      "\u203C      &    ",
      "      &     ",
      "      &     ",
      "     &   \u2591  ",
      "     &   \u2592  ",
      "    &    \u2593  ",
      "    &    \xA3  ",
      "   &    \u2591\xA3  ",
      "   &    \u2592\xA3  ",
      "  &     \u2593\xA3  ",
      "  &     \xA3\xA3  ",
      " &     \u2591\xA3\xA3  ",
      " &     \u2592\xA3\xA3  ",
      "&      \u2593\xA3\xA3  ",
      "&      \xA3\xA3\xA3  ",
      "      \u2591\xA3\xA3\xA3  ",
      "      \u2592\xA3\xA3\xA3  ",
      "      \u2593\xA3\xA3\xA3  ",
      "      \u2588\xA3\xA3\xA3  ",
      "     \u2591\u2588\xA3\xA3\xA3  ",
      "     \u2592\u2588\xA3\xA3\xA3  ",
      "     \u2593\u2588\xA3\xA3\xA3  ",
      "     \u2588\u2588\xA3\xA3\xA3  ",
      "    \u2591\u2588\u2588\xA3\xA3\xA3  ",
      "    \u2592\u2588\u2588\xA3\xA3\xA3  ",
      "    \u2593\u2588\u2588\xA3\xA3\xA3  ",
      "    \u2588\u2588\u2588\xA3\xA3\xA3  ",
      "   \u2591\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "   \u2592\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "   \u2593\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "   \u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "  \u2591\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "  \u2592\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "  \u2593\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "  \u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      " \u2591\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      " \u2592\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      " \u2593\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      " \u2588\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      " \u2588\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  "
    ]
  },
  fish: {
    interval: 80,
    frames: [
      "~~~~~~~~~~~~~~~~~~~~",
      "> ~~~~~~~~~~~~~~~~~~",
      "\xBA> ~~~~~~~~~~~~~~~~~",
      "(\xBA> ~~~~~~~~~~~~~~~~",
      "((\xBA> ~~~~~~~~~~~~~~~",
      "<((\xBA> ~~~~~~~~~~~~~~",
      "><((\xBA> ~~~~~~~~~~~~~",
      " ><((\xBA> ~~~~~~~~~~~~",
      "~ ><((\xBA> ~~~~~~~~~~~",
      "~~ <>((\xBA> ~~~~~~~~~~",
      "~~~ ><((\xBA> ~~~~~~~~~",
      "~~~~ <>((\xBA> ~~~~~~~~",
      "~~~~~ ><((\xBA> ~~~~~~~",
      "~~~~~~ <>((\xBA> ~~~~~~",
      "~~~~~~~ ><((\xBA> ~~~~~",
      "~~~~~~~~ <>((\xBA> ~~~~",
      "~~~~~~~~~ ><((\xBA> ~~~",
      "~~~~~~~~~~ <>((\xBA> ~~",
      "~~~~~~~~~~~ ><((\xBA> ~",
      "~~~~~~~~~~~~ <>((\xBA> ",
      "~~~~~~~~~~~~~ ><((\xBA>",
      "~~~~~~~~~~~~~~ <>((\xBA",
      "~~~~~~~~~~~~~~~ ><((",
      "~~~~~~~~~~~~~~~~ <>(",
      "~~~~~~~~~~~~~~~~~ ><",
      "~~~~~~~~~~~~~~~~~~ <",
      "~~~~~~~~~~~~~~~~~~~~"
    ]
  }
};

// node_modules/.pnpm/cli-spinners@3.4.0/node_modules/cli-spinners/index.js
var cli_spinners_default = spinners_default;
var spinnersList = Object.keys(spinners_default);

// node_modules/.pnpm/string-width@8.2.1/node_modules/string-width/index.js
var segmenter2 = new Intl.Segmenter();
var zeroWidthClusterRegex = new RegExp("^(?:\\p{Default_Ignorable_Code_Point}|\\p{Control}|\\p{Format}|\\p{Mark}|\\p{Surrogate})+$", "v");
var leadingNonPrintingRegex = new RegExp("^[\\p{Default_Ignorable_Code_Point}\\p{Control}\\p{Format}\\p{Mark}\\p{Surrogate}]+", "v");
var rgiEmojiRegex = new RegExp("^\\p{RGI_Emoji}$", "v");
var unqualifiedKeycapRegex = /^[\d#*]\u20E3$/;
var extendedPictographicRegex = new RegExp("\\p{Extended_Pictographic}", "gu");
function isDoubleWidthNonRgiEmojiSequence(segment) {
  if (segment.length > 50) {
    return false;
  }
  if (unqualifiedKeycapRegex.test(segment)) {
    return true;
  }
  if (segment.includes("\u200D")) {
    const pictographics = segment.match(extendedPictographicRegex);
    return pictographics !== null && pictographics.length >= 2;
  }
  return false;
}
function baseVisible(segment) {
  return segment.replace(leadingNonPrintingRegex, "");
}
function isZeroWidthCluster(segment) {
  return zeroWidthClusterRegex.test(segment);
}
function isHangulLeadingJamo(codePoint) {
  return codePoint >= 4352 && codePoint <= 4447 || codePoint >= 43360 && codePoint <= 43388;
}
function isHangulVowelJamo(codePoint) {
  return codePoint >= 4448 && codePoint <= 4519 || codePoint >= 55216 && codePoint <= 55238;
}
function isHangulTrailingJamo(codePoint) {
  return codePoint >= 4520 && codePoint <= 4607 || codePoint >= 55243 && codePoint <= 55291;
}
function isHangulJamo(codePoint) {
  return isHangulLeadingJamo(codePoint) || isHangulVowelJamo(codePoint) || isHangulTrailingJamo(codePoint);
}
function hangulClusterWidth(visibleSegment, eastAsianWidthOptions) {
  const codePoints = [];
  for (const character of visibleSegment) {
    if (zeroWidthClusterRegex.test(character)) {
      continue;
    }
    codePoints.push(character.codePointAt(0));
  }
  if (codePoints.length === 0) {
    return void 0;
  }
  let width = 0;
  for (let index = 0; index < codePoints.length; index++) {
    const codePoint = codePoints[index];
    if (!isHangulJamo(codePoint)) {
      if (width === 0) {
        return void 0;
      }
      for (let remaining = index; remaining < codePoints.length; remaining++) {
        width += eastAsianWidth(codePoints[remaining], eastAsianWidthOptions);
      }
      return width;
    }
    if (isHangulLeadingJamo(codePoint) && isHangulVowelJamo(codePoints[index + 1])) {
      width += 2;
      index += isHangulTrailingJamo(codePoints[index + 2]) ? 2 : 1;
      continue;
    }
    width += eastAsianWidth(codePoint, eastAsianWidthOptions);
  }
  return width;
}
function trailingHalfwidthWidth(visibleSegment, eastAsianWidthOptions) {
  let extra = 0;
  let first = true;
  for (const character of visibleSegment) {
    if (first) {
      first = false;
      continue;
    }
    if (character >= "\uFF00" && character <= "\uFFEF") {
      extra += eastAsianWidth(character.codePointAt(0), eastAsianWidthOptions);
    }
  }
  return extra;
}
function stringWidth2(input2, options = {}) {
  if (typeof input2 !== "string" || input2.length === 0) {
    return 0;
  }
  const {
    ambiguousIsNarrow = true,
    countAnsiEscapeCodes = false
  } = options;
  let string = input2;
  if (!countAnsiEscapeCodes && (string.includes("\x1B") || string.includes("\x9B"))) {
    string = stripAnsi(string);
  }
  if (string.length === 0) {
    return 0;
  }
  if (/^[\u0020-\u007E]*$/.test(string)) {
    return string.length;
  }
  let width = 0;
  const eastAsianWidthOptions = { ambiguousAsWide: !ambiguousIsNarrow };
  for (const { segment } of segmenter2.segment(string)) {
    if (isZeroWidthCluster(segment)) {
      continue;
    }
    if (rgiEmojiRegex.test(segment) || isDoubleWidthNonRgiEmojiSequence(segment)) {
      width += 2;
      continue;
    }
    const visibleSegment = baseVisible(segment);
    const hangulWidth = hangulClusterWidth(visibleSegment, eastAsianWidthOptions);
    if (hangulWidth !== void 0) {
      width += hangulWidth;
      continue;
    }
    const codePoint = visibleSegment.codePointAt(0);
    width += eastAsianWidth(codePoint, eastAsianWidthOptions);
    width += trailingHalfwidthWidth(visibleSegment, eastAsianWidthOptions);
  }
  return width;
}

// node_modules/.pnpm/is-interactive@2.0.0/node_modules/is-interactive/index.js
function isInteractive({ stream = process.stdout } = {}) {
  return Boolean(
    stream && stream.isTTY && process.env.TERM !== "dumb" && !("CI" in process.env)
  );
}

// node_modules/.pnpm/stdin-discarder@0.3.2/node_modules/stdin-discarder/index.js
var import_node_process6 = __toESM(require("node:process"), 1);
var ASCII_ETX_CODE = 3;
var StdinDiscarder = class {
  #activeCount = 0;
  #stdin;
  #stdinWasPaused = false;
  #stdinWasRaw = false;
  #handleInputBound = (chunk) => {
    if (!chunk?.length) {
      return;
    }
    const code = typeof chunk === "string" ? chunk.codePointAt(0) : chunk[0];
    if (code === ASCII_ETX_CODE) {
      import_node_process6.default.kill(import_node_process6.default.pid, "SIGINT");
    }
  };
  start() {
    this.#activeCount++;
    if (this.#activeCount === 1) {
      this.#realStart();
    }
  }
  stop() {
    if (this.#activeCount === 0) {
      return;
    }
    if (--this.#activeCount === 0) {
      this.#realStop();
    }
  }
  #realStart() {
    const { stdin } = import_node_process6.default;
    if (import_node_process6.default.platform === "win32" || !stdin?.isTTY || typeof stdin.setRawMode !== "function") {
      this.#stdin = void 0;
      return;
    }
    this.#stdin = stdin;
    this.#stdinWasPaused = stdin.isPaused();
    this.#stdinWasRaw = Boolean(stdin.isRaw);
    stdin.setRawMode(true);
    stdin.prependListener("data", this.#handleInputBound);
    if (this.#stdinWasPaused) {
      stdin.resume();
    }
  }
  #realStop() {
    if (!this.#stdin) {
      return;
    }
    const stdin = this.#stdin;
    stdin.off("data", this.#handleInputBound);
    if (stdin.isTTY) {
      stdin.setRawMode?.(this.#stdinWasRaw);
    }
    if (this.#stdinWasPaused) {
      stdin.pause();
    }
    this.#stdin = void 0;
    this.#stdinWasPaused = false;
    this.#stdinWasRaw = false;
  }
};
var stdinDiscarder = new StdinDiscarder();
var stdin_discarder_default = Object.freeze(stdinDiscarder);

// node_modules/.pnpm/ora@9.4.0/node_modules/ora/index.js
var RENDER_DEFERRAL_TIMEOUT = 200;
var SYNCHRONIZED_OUTPUT_ENABLE = "\x1B[?2026h";
var SYNCHRONIZED_OUTPUT_DISABLE = "\x1B[?2026l";
var activeHooksPerStream = /* @__PURE__ */ new Map();
var validColors = /* @__PURE__ */ new Set(["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white", "gray"]);
var Ora = class {
  #linesToClear = 0;
  #frameIndex = -1;
  #lastFrameTime = 0;
  #options;
  #spinner;
  #stream;
  #id;
  #hookedStreams = /* @__PURE__ */ new Map();
  #isInternalWrite = false;
  #drainHandler;
  #deferRenderTimer;
  #isDiscardingStdin = false;
  #color;
  // Helper to execute writes while preventing hook recursion
  #internalWrite(fn) {
    this.#isInternalWrite = true;
    try {
      return fn();
    } finally {
      this.#isInternalWrite = false;
    }
  }
  // Helper to render if still spinning
  #tryRender() {
    if (this.isSpinning) {
      this.render();
    }
  }
  #stringifyChunk(chunk, encoding) {
    if (chunk === void 0 || chunk === null) {
      return "";
    }
    if (typeof chunk === "string") {
      return chunk;
    }
    if (Buffer.isBuffer(chunk) || ArrayBuffer.isView(chunk)) {
      const normalizedEncoding = typeof encoding === "string" && encoding && encoding !== "buffer" ? encoding : "utf8";
      return Buffer.from(chunk).toString(normalizedEncoding);
    }
    return String(chunk);
  }
  #chunkTerminatesLine(chunkString) {
    if (!chunkString) {
      return false;
    }
    const lastCharacter = chunkString.at(-1);
    return lastCharacter === "\n" || lastCharacter === "\r";
  }
  #scheduleRenderDeferral() {
    if (this.#deferRenderTimer) {
      return;
    }
    this.#deferRenderTimer = setTimeout(() => {
      this.#deferRenderTimer = void 0;
      if (this.isSpinning) {
        this.#tryRender();
      }
    }, RENDER_DEFERRAL_TIMEOUT);
    if (typeof this.#deferRenderTimer?.unref === "function") {
      this.#deferRenderTimer.unref();
    }
  }
  #clearRenderDeferral() {
    if (this.#deferRenderTimer) {
      clearTimeout(this.#deferRenderTimer);
      this.#deferRenderTimer = void 0;
    }
  }
  // Helper to build complete line with symbol, text, prefix, and suffix
  #buildOutputLine(symbol, text, prefixText, suffixText) {
    const fullPrefixText = this.#getFullPrefixText(prefixText, " ");
    const separatorText = symbol ? " " : "";
    const fullText = typeof text === "string" ? separatorText + text : "";
    const fullSuffixText = this.#getFullSuffixText(suffixText, " ");
    return fullPrefixText + symbol + fullText + fullSuffixText;
  }
  constructor(options) {
    if (typeof options === "string") {
      options = {
        text: options
      };
    }
    this.#options = {
      color: "cyan",
      stream: import_node_process7.default.stderr,
      discardStdin: true,
      hideCursor: true,
      ...options
    };
    this.color = this.#options.color;
    this.#stream = this.#options.stream;
    if (typeof this.#options.isEnabled !== "boolean") {
      this.#options.isEnabled = isInteractive({ stream: this.#stream });
    }
    if (typeof this.#options.isSilent !== "boolean") {
      this.#options.isSilent = false;
    }
    if (this.#options.interval !== void 0 && !(Number.isInteger(this.#options.interval) && this.#options.interval > 0)) {
      throw new Error("The `interval` option must be a positive integer");
    }
    const userInterval = this.#options.interval;
    this.spinner = this.#options.spinner;
    this.#options.interval = userInterval;
    this.text = this.#options.text;
    this.prefixText = this.#options.prefixText;
    this.suffixText = this.#options.suffixText;
    this.indent = this.#options.indent;
    if (import_node_process7.default.env.NODE_ENV === "test") {
      this._stream = this.#stream;
      this._isEnabled = this.#options.isEnabled;
      Object.defineProperty(this, "_linesToClear", {
        get() {
          return this.#linesToClear;
        },
        set(newValue) {
          this.#linesToClear = newValue;
        }
      });
      Object.defineProperty(this, "_frameIndex", {
        get() {
          return this.#frameIndex;
        }
      });
      Object.defineProperty(this, "_lineCount", {
        get() {
          const columns = this.#stream.columns ?? 80;
          const prefixText = typeof this.#options.prefixText === "function" ? "" : this.#options.prefixText;
          const suffixText = typeof this.#options.suffixText === "function" ? "" : this.#options.suffixText;
          const fullPrefixText = typeof prefixText === "string" && prefixText !== "" ? prefixText + " " : "";
          const fullSuffixText = typeof suffixText === "string" && suffixText !== "" ? " " + suffixText : "";
          const spinnerChar = "-";
          const fullText = " ".repeat(this.#options.indent) + fullPrefixText + spinnerChar + (typeof this.#options.text === "string" ? " " + this.#options.text : "") + fullSuffixText;
          return this.#computeLineCountFrom(fullText, columns);
        }
      });
    }
  }
  get indent() {
    return this.#options.indent;
  }
  set indent(indent = 0) {
    if (!(indent >= 0 && Number.isInteger(indent))) {
      throw new Error("The `indent` option must be an integer from 0 and up");
    }
    this.#options.indent = indent;
  }
  get interval() {
    return this.#options.interval ?? this.#spinner.interval ?? 100;
  }
  get spinner() {
    return this.#spinner;
  }
  set spinner(spinner) {
    this.#frameIndex = -1;
    this.#options.interval = void 0;
    if (typeof spinner === "object") {
      if (!Array.isArray(spinner.frames) || spinner.frames.length === 0 || spinner.frames.some((frame) => typeof frame !== "string")) {
        throw new Error("The given spinner must have a non-empty `frames` array of strings");
      }
      if (spinner.interval !== void 0 && !(Number.isInteger(spinner.interval) && spinner.interval > 0)) {
        throw new Error("`spinner.interval` must be a positive integer if provided");
      }
      this.#spinner = spinner;
    } else if (!isUnicodeSupported()) {
      this.#spinner = cli_spinners_default.line;
    } else if (spinner === void 0) {
      this.#spinner = cli_spinners_default.dots;
    } else if (spinner !== "default" && cli_spinners_default[spinner]) {
      this.#spinner = cli_spinners_default[spinner];
    } else {
      throw new Error(`There is no built-in spinner named '${spinner}'. See https://github.com/sindresorhus/cli-spinners/blob/main/spinners.json for a full list.`);
    }
  }
  get text() {
    return this.#options.text;
  }
  set text(value = "") {
    this.#options.text = value;
  }
  get prefixText() {
    return this.#options.prefixText;
  }
  set prefixText(value = "") {
    this.#options.prefixText = value;
  }
  get suffixText() {
    return this.#options.suffixText;
  }
  set suffixText(value = "") {
    this.#options.suffixText = value;
  }
  get isSpinning() {
    return this.#id !== void 0;
  }
  #formatAffix(value, separator, placeBefore = false) {
    const resolved = typeof value === "function" ? value() : value;
    if (typeof resolved === "string" && resolved !== "") {
      return placeBefore ? separator + resolved : resolved + separator;
    }
    return "";
  }
  #getFullPrefixText(prefixText = this.#options.prefixText, postfix = " ") {
    return this.#formatAffix(prefixText, postfix, false);
  }
  #getFullSuffixText(suffixText = this.#options.suffixText, prefix = " ") {
    return this.#formatAffix(suffixText, prefix, true);
  }
  #computeLineCountFrom(text, columns) {
    let count = 0;
    for (const line of (0, import_node_util.stripVTControlCharacters)(text).split("\n")) {
      count += Math.max(1, Math.ceil(stringWidth2(line) / columns));
    }
    return count;
  }
  get color() {
    return this.#color;
  }
  set color(value) {
    if (value !== void 0 && value !== false && !validColors.has(value)) {
      throw new Error("The `color` option must be a valid color or `false` to disable");
    }
    this.#color = value;
  }
  get isEnabled() {
    return this.#options.isEnabled && !this.#options.isSilent;
  }
  set isEnabled(value) {
    if (typeof value !== "boolean") {
      throw new TypeError("The `isEnabled` option must be a boolean");
    }
    this.#options.isEnabled = value;
  }
  get isSilent() {
    return this.#options.isSilent;
  }
  set isSilent(value) {
    if (typeof value !== "boolean") {
      throw new TypeError("The `isSilent` option must be a boolean");
    }
    this.#options.isSilent = value;
  }
  frame() {
    const now = Date.now();
    if (this.#frameIndex === -1 || now - this.#lastFrameTime >= this.interval) {
      this.#frameIndex = (this.#frameIndex + 1) % this.#spinner.frames.length;
      this.#lastFrameTime = now;
    }
    const { frames } = this.#spinner;
    let frame = frames[this.#frameIndex];
    if (this.#color) {
      frame = source_default[this.#color](frame);
    }
    const fullPrefixText = this.#getFullPrefixText(this.#options.prefixText, " ");
    const fullText = typeof this.text === "string" ? " " + this.text : "";
    const fullSuffixText = this.#getFullSuffixText(this.#options.suffixText, " ");
    return fullPrefixText + frame + fullText + fullSuffixText;
  }
  clear() {
    if (!this.isEnabled || !this.#stream.isTTY) {
      return this;
    }
    this.#internalWrite(() => {
      this.#stream.cursorTo(0);
      for (let index = 0; index < this.#linesToClear; index++) {
        if (index > 0) {
          this.#stream.moveCursor(0, -1);
        }
        this.#stream.clearLine(1);
      }
      if (this.#options.indent) {
        this.#stream.cursorTo(this.#options.indent);
      }
    });
    this.#linesToClear = 0;
    return this;
  }
  // Helper to hook a single stream
  #hookStream(stream) {
    if (!stream || this.#hookedStreams.has(stream) || !stream.isTTY || typeof stream.write !== "function") {
      return;
    }
    if (activeHooksPerStream.has(stream)) {
      console.warn("[ora] Multiple concurrent spinners detected. This may cause visual corruption. Use one spinner at a time.");
    }
    const originalWrite = stream.write;
    this.#hookedStreams.set(stream, originalWrite);
    activeHooksPerStream.set(stream, this);
    stream.write = (chunk, encoding, callback) => this.#hookedWrite(stream, originalWrite, chunk, encoding, callback);
  }
  /**
  Intercept stream writes while spinner is active to handle external writes cleanly without visual corruption.
  Hooks process stdio streams and the active spinner stream so console.log(), console.error(), and direct writes stay tidy.
  */
  #installHook() {
    if (!this.isEnabled || this.#hookedStreams.size > 0) {
      return;
    }
    const streamsToHook = /* @__PURE__ */ new Set([this.#stream, import_node_process7.default.stdout, import_node_process7.default.stderr]);
    for (const stream of streamsToHook) {
      this.#hookStream(stream);
    }
  }
  #uninstallHook() {
    for (const [stream, originalWrite] of this.#hookedStreams) {
      stream.write = originalWrite;
      if (activeHooksPerStream.get(stream) === this) {
        activeHooksPerStream.delete(stream);
      }
    }
    this.#hookedStreams.clear();
  }
  // eslint-disable-next-line max-params -- Need stream and originalWrite for multi-stream support
  #hookedWrite(stream, originalWrite, chunk, encoding, callback) {
    if (typeof encoding === "function") {
      callback = encoding;
      encoding = void 0;
    }
    if (this.#isInternalWrite) {
      return originalWrite.call(stream, chunk, encoding, callback);
    }
    this.clear();
    const chunkString = this.#stringifyChunk(chunk, encoding);
    const chunkTerminatesLine = this.#chunkTerminatesLine(chunkString);
    const writeResult = originalWrite.call(stream, chunk, encoding, callback);
    if (chunkTerminatesLine) {
      this.#clearRenderDeferral();
    } else if (chunkString.length > 0) {
      this.#scheduleRenderDeferral();
    }
    if (this.isSpinning && !this.#deferRenderTimer) {
      this.render();
    }
    return writeResult;
  }
  render() {
    if (!this.isEnabled || this.#drainHandler || this.#deferRenderTimer) {
      return this;
    }
    const useSynchronizedOutput = this.#stream.isTTY;
    let shouldDisableSynchronizedOutput = false;
    try {
      if (useSynchronizedOutput) {
        this.#internalWrite(() => this.#stream.write(SYNCHRONIZED_OUTPUT_ENABLE));
        shouldDisableSynchronizedOutput = true;
      }
      this.clear();
      let frameContent = this.frame();
      const columns = this.#stream.columns ?? 80;
      const actualLineCount = this.#computeLineCountFrom(frameContent, columns);
      const consoleHeight = this.#stream.rows;
      if (consoleHeight && consoleHeight > 1 && actualLineCount > consoleHeight) {
        const lines = frameContent.split("\n");
        const maxLines = consoleHeight - 1;
        frameContent = [...lines.slice(0, maxLines), "... (content truncated to fit terminal)"].join("\n");
      }
      const canContinue = this.#internalWrite(() => this.#stream.write(frameContent));
      if (canContinue === false && this.#stream.isTTY) {
        this.#drainHandler = () => {
          this.#drainHandler = void 0;
          this.#tryRender();
        };
        this.#stream.once("drain", this.#drainHandler);
      }
      this.#linesToClear = this.#computeLineCountFrom(frameContent, columns);
    } finally {
      if (shouldDisableSynchronizedOutput) {
        this.#internalWrite(() => this.#stream.write(SYNCHRONIZED_OUTPUT_DISABLE));
      }
    }
    return this;
  }
  start(text) {
    if (text) {
      this.text = text;
    }
    if (this.isSilent) {
      return this;
    }
    if (!this.isEnabled) {
      const symbol = this.text ? "-" : "";
      const line = " ".repeat(this.#options.indent) + this.#buildOutputLine(symbol, this.text, this.#options.prefixText, this.#options.suffixText);
      if (line.trim() !== "") {
        this.#internalWrite(() => this.#stream.write(line + "\n"));
      }
      return this;
    }
    if (this.isSpinning) {
      return this;
    }
    if (this.#options.hideCursor) {
      cli_cursor_default.hide(this.#stream);
    }
    if (this.#options.discardStdin && import_node_process7.default.stdin.isTTY) {
      stdin_discarder_default.start();
      this.#isDiscardingStdin = true;
    }
    this.#installHook();
    this.render();
    this.#id = setInterval(this.render.bind(this), this.interval);
    return this;
  }
  stop() {
    clearInterval(this.#id);
    this.#id = void 0;
    this.#frameIndex = -1;
    this.#lastFrameTime = 0;
    this.#clearRenderDeferral();
    this.#uninstallHook();
    if (this.#drainHandler) {
      this.#stream.removeListener("drain", this.#drainHandler);
      this.#drainHandler = void 0;
    }
    if (this.isEnabled) {
      this.clear();
      if (this.#options.hideCursor) {
        cli_cursor_default.show(this.#stream);
      }
    }
    if (this.#isDiscardingStdin) {
      this.#isDiscardingStdin = false;
      stdin_discarder_default.stop();
    }
    return this;
  }
  succeed(text) {
    return this.stopAndPersist({ symbol: symbols_exports.success, text });
  }
  fail(text) {
    return this.stopAndPersist({ symbol: symbols_exports.error, text });
  }
  warn(text) {
    return this.stopAndPersist({ symbol: symbols_exports.warning, text });
  }
  info(text) {
    return this.stopAndPersist({ symbol: symbols_exports.info, text });
  }
  stopAndPersist(options = {}) {
    if (this.isSilent) {
      return this;
    }
    const symbol = options.symbol ?? " ";
    const text = options.text ?? this.text;
    const prefixText = options.prefixText ?? this.#options.prefixText;
    const suffixText = options.suffixText ?? this.#options.suffixText;
    const textToWrite = this.#buildOutputLine(symbol, text, prefixText, suffixText) + "\n";
    this.stop();
    this.#internalWrite(() => this.#stream.write(textToWrite));
    return this;
  }
};
function ora(options) {
  return new Ora(options);
}

// src/animations/index.ts
var DIVIDER_LENGTH = 56;
var divider = (label) => {
  if (!label) {
    console.log(source_default.gray("\u2500".repeat(DIVIDER_LENGTH)));
    return;
  }
  const normalized = ` ${label.trim().toUpperCase()} `;
  const side = Math.max(2, Math.floor((DIVIDER_LENGTH - normalized.length) / 2));
  const right = Math.max(2, DIVIDER_LENGTH - normalized.length - side);
  console.log(source_default.gray(`${"\u2500".repeat(side)}${normalized}${"\u2500".repeat(right)}`));
};
var loading = (message2) => {
  const spinner = ora({ text: message2, spinner: "dots" }).start();
  return {
    stop: () => {
      spinner.stop();
    }
  };
};
var success2 = async (message2) => {
  console.log(`${symbols_exports.success} ${source_default.green(message2)}`);
};
var error2 = async (message2) => {
  console.error(`${symbols_exports.error} ${source_default.red(message2)}`);
};
var message = async (message2) => {
  console.log(`${symbols_exports.info} ${source_default.blue(message2)}`);
};

// src/copilot/auth.ts
var import_promises = require("node:fs/promises");
var import_node_path = __toESM(require("node:path"), 1);
var DEFAULT_CLIENT_ID = process.env.COPILOT_CLIENT_ID || "Ov23li8tweQw6odWQebz";
var DEFAULT_AUTH_FILE_PATH = import_node_path.default.resolve(process.cwd(), ".copilot/auth.json");
var DEFAULT_SCOPE = "read:user";
var EXPIRY_SKEW_MS = 3e4;
var normalizeDomain = (value) => {
  return value.replace(/^https?:\/\//, "").replace(/\/$/, "");
};
var resolveOAuthDomain = (enterpriseUrl) => {
  if (!enterpriseUrl) return "github.com";
  return normalizeDomain(enterpriseUrl);
};
var resolveOAuthEndpoints = (enterpriseUrl) => {
  const domain = resolveOAuthDomain(enterpriseUrl);
  return {
    deviceCodeUrl: `https://${domain}/login/device/code`,
    tokenUrl: `https://${domain}/login/oauth/access_token`
  };
};
var isExpired = (expiresAt) => {
  return Date.now() + EXPIRY_SKEW_MS >= expiresAt;
};
var getStaticCopilotToken = () => {
  const token = process.env.COPILOT_TOKEN?.trim();
  return token || void 0;
};
var parseJsonOrThrow = async (response, context) => {
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`${context} falhou com status ${response.status}: ${body.slice(0, 400)}`);
  }
  return await response.json();
};
var CopilotAuthManager = class {
  authFilePath;
  enterpriseUrl;
  clientId;
  logger;
  cache;
  constructor(options = {}) {
    this.authFilePath = options.authFilePath || DEFAULT_AUTH_FILE_PATH;
    this.enterpriseUrl = options.enterpriseUrl;
    this.clientId = options.clientId || DEFAULT_CLIENT_ID;
    this.logger = options.logger || console;
  }
  async loadAuthRecord() {
    if (this.cache) return this.cache;
    const raw = await (0, import_promises.readFile)(this.authFilePath, "utf8").catch(() => void 0);
    if (!raw) return void 0;
    const parsed = JSON.parse(raw);
    if (!parsed.accessToken || !parsed.expiresAt) return void 0;
    const record = {
      accessToken: parsed.accessToken,
      refreshToken: parsed.refreshToken,
      expiresAt: parsed.expiresAt,
      tokenType: "bearer",
      enterpriseUrl: parsed.enterpriseUrl
    };
    this.cache = record;
    return record;
  }
  async saveAuthRecord(record) {
    const dir = import_node_path.default.dirname(this.authFilePath);
    await (0, import_promises.mkdir)(dir, { recursive: true });
    await (0, import_promises.writeFile)(this.authFilePath, JSON.stringify(record, null, 2), "utf8");
    this.cache = record;
  }
  async requestDeviceCode(enterpriseUrl) {
    const endpoints = resolveOAuthEndpoints(enterpriseUrl || this.enterpriseUrl);
    const response = await fetch(endpoints.deviceCodeUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        client_id: this.clientId,
        scope: DEFAULT_SCOPE
      })
    });
    return parseJsonOrThrow(response, "Solicitacao do device code");
  }
  async requestTokenByDeviceCode(deviceCode, enterpriseUrl) {
    const endpoints = resolveOAuthEndpoints(enterpriseUrl || this.enterpriseUrl);
    const response = await fetch(endpoints.tokenUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        client_id: this.clientId,
        device_code: deviceCode,
        grant_type: "urn:ietf:params:oauth:grant-type:device_code"
      })
    });
    return parseJsonOrThrow(response, "Polling do OAuth token");
  }
  async requestTokenByRefreshToken(refreshToken, enterpriseUrl) {
    const endpoints = resolveOAuthEndpoints(enterpriseUrl || this.enterpriseUrl);
    const response = await fetch(endpoints.tokenUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        client_id: this.clientId,
        grant_type: "refresh_token",
        refresh_token: refreshToken
      })
    });
    return parseJsonOrThrow(response, "Refresh do OAuth token");
  }
  async authorizeDeviceCodeFlow(enterpriseUrl) {
    const selectedEnterpriseUrl = enterpriseUrl || this.enterpriseUrl;
    const device = await this.requestDeviceCode(selectedEnterpriseUrl);
    this.logger.info(
      `
Autenticacao Copilot: acesse ${device.verification_uri} e informe o codigo ${device.user_code}
`
    );
    const timeoutAt = Date.now() + device.expires_in * 1e3;
    let intervalMs = Math.max(1, device.interval) * 1e3;
    while (Date.now() < timeoutAt) {
      await new Promise((resolve) => setTimeout(resolve, intervalMs));
      const token = await this.requestTokenByDeviceCode(device.device_code, selectedEnterpriseUrl);
      if (token.access_token) {
        const record = {
          accessToken: token.access_token,
          refreshToken: token.refresh_token,
          expiresAt: Date.now() + Math.max(60, token.expires_in || 3600) * 1e3,
          tokenType: "bearer",
          enterpriseUrl: selectedEnterpriseUrl
        };
        await this.saveAuthRecord(record);
        this.logger.info(`Credenciais salvas em ${this.authFilePath}`);
        return record;
      }
      if (token.error === "authorization_pending") {
        continue;
      }
      if (token.error === "slow_down") {
        intervalMs += 5e3;
        continue;
      }
      throw new Error(`Falha no OAuth Device Flow: ${token.error || "erro desconhecido"}`);
    }
    throw new Error("Tempo esgotado aguardando autorizacao no OAuth Device Flow.");
  }
  async refreshAccessToken() {
    const staticToken = getStaticCopilotToken();
    if (staticToken) {
      return staticToken;
    }
    const record = await this.loadAuthRecord();
    if (!record) {
      const created = await this.authorizeDeviceCodeFlow(this.enterpriseUrl);
      return created.accessToken;
    }
    if (!record.refreshToken) {
      this.logger.warn("Refresh token ausente. Iniciando novo OAuth Device Flow...");
      const created = await this.authorizeDeviceCodeFlow(
        record.enterpriseUrl || this.enterpriseUrl
      );
      return created.accessToken;
    }
    const token = await this.requestTokenByRefreshToken(
      record.refreshToken,
      record.enterpriseUrl || this.enterpriseUrl
    );
    if (!token.access_token) {
      this.logger.warn("Refresh token falhou. Iniciando novo OAuth Device Flow...");
      const created = await this.authorizeDeviceCodeFlow(
        record.enterpriseUrl || this.enterpriseUrl
      );
      return created.accessToken;
    }
    const refreshed = {
      accessToken: token.access_token,
      refreshToken: token.refresh_token || record.refreshToken,
      expiresAt: Date.now() + Math.max(60, token.expires_in || 3600) * 1e3,
      tokenType: "bearer",
      enterpriseUrl: record.enterpriseUrl
    };
    await this.saveAuthRecord(refreshed);
    this.logger.info("Token OAuth renovado com sucesso.");
    return refreshed.accessToken;
  }
  async getValidAccessToken() {
    const staticToken = getStaticCopilotToken();
    if (staticToken) {
      return staticToken;
    }
    const record = await this.loadAuthRecord();
    if (!record) {
      const created = await this.authorizeDeviceCodeFlow(this.enterpriseUrl);
      return created.accessToken;
    }
    if (!isExpired(record.expiresAt)) {
      return record.accessToken;
    }
    this.logger.info("Token expirado. Renovando token OAuth...");
    return this.refreshAccessToken();
  }
  async getAuthRecord() {
    return this.loadAuthRecord();
  }
};
var createCopilotAuthManager = (options = {}) => {
  return new CopilotAuthManager(options);
};

// src/copilot/models.ts
var MODELS_CACHE = /* @__PURE__ */ new Map();
var INFLIGHT = /* @__PURE__ */ new Map();
var CACHE_TTL_MS = 5 * 60 * 1e3;
var toModelInfo = (model) => {
  const supports = model.capabilities.supports;
  const hasReasoning = Boolean(supports.adaptive_thinking) || Boolean(supports.reasoning_effort && supports.reasoning_effort.length > 0) || typeof supports.max_thinking_budget === "number" || typeof supports.min_thinking_budget === "number";
  return {
    id: model.id,
    name: model.name,
    family: model.capabilities.family,
    endpoints: model.supported_endpoints || [],
    limits: {
      contextTokens: model.capabilities.limits.max_context_window_tokens,
      outputTokens: model.capabilities.limits.max_output_tokens,
      promptTokens: model.capabilities.limits.max_prompt_tokens
    },
    capabilities: {
      chat: true,
      reasoning: hasReasoning,
      streaming: supports.streaming,
      toolCalls: supports.tool_calls,
      vision: Boolean(supports.vision),
      structuredOutputs: Boolean(supports.structured_outputs)
    }
  };
};
var parseResponse = async (response) => {
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Falha ao buscar modelos (${response.status}): ${body.slice(0, 400)}`);
  }
  const data = await response.json();
  if (!Array.isArray(data.data)) {
    throw new Error("Resposta invalida do endpoint /models (campo data ausente).");
  }
  return { data: data.data };
};
var fetchModels = async (baseURL, deps = {}) => {
  const logger = deps.logger || console;
  const now = Date.now();
  const cached = MODELS_CACHE.get(baseURL);
  if (!deps.forceRefresh && cached && cached.expiresAt > now) {
    return cached.value;
  }
  const running = INFLIGHT.get(baseURL);
  if (running) {
    return running;
  }
  const currentFetch = (async () => {
    logger.info(`Buscando modelos dinamicos do Copilot em ${baseURL}/models`);
    const response = await (deps.fetcher || fetch)(`${baseURL}/models`, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    });
    const json = await parseResponse(response);
    const enabled = json.data.filter(
      (item) => item.model_picker_enabled && item.policy?.state !== "disabled"
    );
    const mapped = enabled.map(toModelInfo);
    MODELS_CACHE.set(baseURL, {
      value: mapped,
      expiresAt: Date.now() + CACHE_TTL_MS
    });
    return mapped;
  })();
  INFLIGHT.set(baseURL, currentFetch);
  try {
    return await currentFetch;
  } finally {
    INFLIGHT.delete(baseURL);
  }
};

// src/copilot/copilot-provider.ts
var assertHttpOk = async (response, endpoint) => {
  if (response.ok) return;
  const body = await response.text();
  throw new Error(
    `Copilot ${endpoint} falhou com status ${response.status}: ${body.slice(0, 500)}`
  );
};
var extractResponsesText = (json) => {
  if (json.output_text && json.output_text.trim().length > 0) {
    return json.output_text.trim();
  }
  const fromOutput = json.output?.flatMap((item) => item.content || []).filter((part) => part.type === "output_text" || part.type === "text").map((part) => part.text || "").join("\n").trim();
  if (fromOutput && fromOutput.length > 0) {
    return fromOutput;
  }
  return void 0;
};
var CopilotProvider = class {
  baseURL;
  fetcher;
  logger;
  constructor(options) {
    this.baseURL = options.baseURL;
    this.fetcher = options.fetcher;
    this.logger = options.logger || console;
  }
  async chat(model, input2) {
    this.logger.info(`Executando chat.completions no Copilot para modelo ${model}`);
    const response = await this.fetcher(`${this.baseURL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        model,
        messages: input2.messages,
        temperature: input2.temperature ?? 0.2,
        max_tokens: input2.maxOutputTokens
      })
    });
    await assertHttpOk(response, "chat.completions");
    const json = await response.json();
    const content = json.choices?.[0]?.message?.content?.trim();
    if (!content) {
      throw new Error("Copilot chat.completions retornou resposta sem texto.");
    }
    return content;
  }
  async responses(model, input2) {
    this.logger.info(`Executando responses API no Copilot para modelo ${model}`);
    const response = await this.fetcher(`${this.baseURL}/responses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        model,
        input: input2.messages,
        temperature: input2.temperature ?? 0.2,
        max_output_tokens: input2.maxOutputTokens
      })
    });
    await assertHttpOk(response, "responses");
    const json = await response.json();
    const content = extractResponsesText(json);
    if (!content) {
      throw new Error("Copilot responses retornou resposta sem texto.");
    }
    return content;
  }
  async models() {
    return fetchModels(this.baseURL, {
      fetcher: this.fetcher,
      logger: this.logger
    });
  }
};

// src/copilot/fetch.ts
var isNetworkError = (error3) => {
  return error3 instanceof TypeError;
};
var delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
var shouldRetryStatus = (status, retryStatusCodes) => {
  return retryStatusCodes.includes(status);
};
var canRetryBody = (body) => {
  return !(typeof ReadableStream !== "undefined" && body instanceof ReadableStream);
};
var cloneHeaders = (headers) => {
  return new Headers(headers || {});
};
var createCopilotFetch = (options) => {
  const logger = options.logger || console;
  const maxRetries = options.maxRetries ?? 2;
  const retryDelayMs = options.retryDelayMs ?? 600;
  const retryStatusCodes = options.retryStatusCodes ?? [408, 425, 429, 500, 502, 503, 504];
  const userAgent = options.userAgent || "mcp-frontend-copilot/1.0";
  return async (input2, init = {}) => {
    const replayable = canRetryBody(init.body);
    let attempt = 0;
    while (true) {
      const token = await options.auth.getValidAccessToken();
      const headers = cloneHeaders(init.headers);
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("User-Agent", userAgent);
      headers.set("Openai-Intent", "conversation-edits");
      try {
        const response = await fetch(input2, {
          ...init,
          headers
        });
        if (response.status === 401) {
          logger.warn("Token invalido/expirado recebido (401). Tentando refresh imediato...");
          const refreshedToken = await options.auth.refreshAccessToken();
          const retryHeaders = cloneHeaders(init.headers);
          retryHeaders.set("Authorization", `Bearer ${refreshedToken}`);
          retryHeaders.set("User-Agent", userAgent);
          retryHeaders.set("Openai-Intent", "conversation-edits");
          const retryResponse = await fetch(input2, {
            ...init,
            headers: retryHeaders
          });
          if (retryResponse.status !== 401) {
            return retryResponse;
          }
          const body = await retryResponse.text();
          throw new Error(`Falha de autenticacao Copilot (401): ${body.slice(0, 300)}`);
        }
        if (attempt < maxRetries && replayable && shouldRetryStatus(response.status, retryStatusCodes)) {
          const waitMs = retryDelayMs * 2 ** attempt;
          logger.warn(
            `HTTP ${response.status}. Retry ${attempt + 1}/${maxRetries} em ${waitMs}ms.`
          );
          attempt += 1;
          await delay(waitMs);
          continue;
        }
        return response;
      } catch (error3) {
        if (attempt < maxRetries && replayable && isNetworkError(error3)) {
          const waitMs = retryDelayMs * 2 ** attempt;
          logger.warn(`Falha de rede. Retry ${attempt + 1}/${maxRetries} em ${waitMs}ms.`);
          attempt += 1;
          await delay(waitMs);
          continue;
        }
        throw error3;
      }
    }
  };
};

// src/copilot/provider.ts
var resolveBaseURL = (enterpriseUrl) => {
  if (enterpriseUrl) {
    return `https://copilot-api.${normalizeDomain(enterpriseUrl)}`;
  }
  return "https://api.githubcopilot.com";
};
function resolveMode(model) {
  if (model.startsWith("gpt-5") && model !== "gpt-5-mini") {
    return "responses";
  }
  return "chat";
}
var createRuntimeCopilotProvider = (options = {}) => {
  const logger = options.logger || console;
  const enterpriseUrl = options.enterpriseUrl || process.env.COPILOT_ENTERPRISE_URL;
  const baseURL = resolveBaseURL(enterpriseUrl);
  const auth = createCopilotAuthManager({
    enterpriseUrl,
    logger
  });
  const fetcher = createCopilotFetch({
    auth,
    logger
  });
  const provider = new CopilotProvider({
    baseURL,
    fetcher,
    logger
  });
  return {
    baseURL,
    auth,
    chat: (model, input2) => provider.chat(model, input2),
    responses: (model, input2) => provider.responses(model, input2),
    fetchModels: () => fetchModels(baseURL, {
      fetcher,
      logger
    }),
    resolveMode,
    async runModel(input2, model) {
      const mode = resolveMode(model);
      logger.info(`Modo resolvido para ${model}: ${mode}`);
      if (mode === "responses") {
        return provider.responses(model, input2);
      }
      return provider.chat(model, input2);
    }
  };
};
var copilotRuntime = createRuntimeCopilotProvider();

// src/integrations/figma.ts
var import_promises2 = require("node:fs/promises");
var readline = __toESM(require("node:readline/promises"), 1);
var import_process = require("process");
var import_node_path2 = __toESM(require("node:path"), 1);
var FIGMA_API_BASE = "https://api.figma.com/v1";
var SVG_DIR_NAME = "svg";
var RUNTIME_SECRETS_PATH = import_node_path2.default.resolve(
  process.env.HOME || process.cwd(),
  ".mcp-frontend",
  "secrets.json"
);
var FIGMA_URL_REGEX = /figma\.com\/(?:file|design)\/([a-zA-Z0-9]+)/;
var normalizeNodeId = (value) => {
  return decodeURIComponent(value).replace(/-/g, ":").trim();
};
var parseFigmaUrl = (figmaUrl) => {
  const trimmedUrl = figmaUrl.trim();
  try {
    const parsedUrl = new URL(trimmedUrl);
    const fileKeyMatch = parsedUrl.pathname.match(/\/(?:file|design)\/([a-zA-Z0-9]+)/);
    const fileKey = fileKeyMatch?.[1];
    if (!fileKey) {
      throw new Error("FILE_KEY nao encontrado no link do Figma.");
    }
    const rawNodeId = parsedUrl.searchParams.get("node-id") ?? void 0;
    const nodeId = rawNodeId ? normalizeNodeId(rawNodeId) : void 0;
    return { fileKey, nodeId };
  } catch {
    const fallbackMatch = trimmedUrl.match(FIGMA_URL_REGEX);
    if (!fallbackMatch) {
      throw new Error(
        "URL do Figma invalida. Use um link no formato https://figma.com/design/FILE_KEY?node-id=..."
      );
    }
    return { fileKey: fallbackMatch[1] };
  }
};
var normalizeFileName = (value) => {
  const normalized = value.normalize("NFD").replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-").toLowerCase();
  return normalized || "asset";
};
var rgbaToHex = (r, g, b, a) => {
  const toHex = (v) => Math.round(v * 255).toString(16).padStart(2, "0");
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  return a < 1 ? `${hex}${toHex(a)}` : hex;
};
var extractDesignInfo = (node) => {
  const texts = [];
  const colorsSet = /* @__PURE__ */ new Set();
  const typography = [];
  const styleRefsMap = /* @__PURE__ */ new Map();
  const walk = (n) => {
    if (n.type === "TEXT" && n.characters) {
      const text = n.characters.trim();
      if (text) {
        texts.push(text);
        if (n.style) {
          typography.push({
            text,
            fontFamily: n.style.fontFamily,
            fontSize: n.style.fontSize,
            fontWeight: n.style.fontWeight
          });
        }
      }
    }
    for (const fill of n.fills ?? []) {
      if (fill.color && fill.type === "SOLID") {
        colorsSet.add(rgbaToHex(fill.color.r, fill.color.g, fill.color.b, fill.color.a));
      }
    }
    if (n.styles) {
      for (const [styleType, styleId] of Object.entries(n.styles)) {
        if (!styleRefsMap.has(styleType)) {
          styleRefsMap.set(styleType, /* @__PURE__ */ new Set());
        }
        styleRefsMap.get(styleType)?.add(styleId);
      }
    }
    for (const child of n.children ?? []) {
      walk(child);
    }
  };
  walk(node);
  const box = node.absoluteBoundingBox;
  const styleRefs = {};
  for (const [key, set] of styleRefsMap.entries()) {
    styleRefs[key] = Array.from(set);
  }
  return {
    texts,
    colors: Array.from(colorsSet),
    styleRefs,
    typography,
    layout: {
      mode: node.layoutMode !== "NONE" ? node.layoutMode : void 0,
      padding: node.paddingTop !== void 0 ? {
        top: node.paddingTop ?? 0,
        bottom: node.paddingBottom ?? 0,
        left: node.paddingLeft ?? 0,
        right: node.paddingRight ?? 0
      } : void 0,
      gap: node.itemSpacing,
      width: box?.width,
      height: box?.height,
      cornerRadius: node.cornerRadius,
      primaryAxisAlign: node.primaryAxisAlignItems,
      counterAxisAlign: node.counterAxisAlignItems
    }
  };
};
var toVueComponentName = (rawName) => {
  return rawName.split(/[^a-zA-Z0-9]+/).filter(Boolean).map((chunk) => chunk[0].toUpperCase() + chunk.slice(1).toLowerCase()).join("");
};
var shouldExportAsSvg = (node) => {
  const vectorNodeTypes = /* @__PURE__ */ new Set([
    "VECTOR",
    "BOOLEAN_OPERATION",
    "STAR",
    "ELLIPSE",
    "POLYGON",
    "LINE",
    "RECTANGLE",
    "COMPONENT",
    "INSTANCE"
  ]);
  if (vectorNodeTypes.has(node.type)) {
    return true;
  }
  const hasImageFill = (node.fills ?? []).some((fill) => fill.type === "IMAGE" && !!fill.imageRef);
  return hasImageFill;
};
var collectExportableNodeIds = (node, output2 = [], maxNodes = 20, visited = /* @__PURE__ */ new Set(), depth = 0) => {
  if (visited.has(node.id)) {
    return output2;
  }
  visited.add(node.id);
  if (output2.length >= maxNodes) {
    return output2;
  }
  if (shouldExportAsSvg(node)) {
    output2.push({ id: node.id, name: node.name });
  }
  if (output2.length >= maxNodes) {
    return output2;
  }
  if (node.children && Array.isArray(node.children)) {
    for (let i = 0; i < Math.min(node.children.length, 15); i++) {
      if (output2.length >= maxNodes) {
        break;
      }
      const child = node.children[i];
      if (child) {
        collectExportableNodeIds(child, output2, maxNodes, visited, depth + 1);
      }
    }
  }
  return output2;
};
var collectAllExportableIds = (node, output2 = [], maxNodes = 20, visited = /* @__PURE__ */ new Set()) => {
  if (visited.has(node.id)) {
    return output2;
  }
  visited.add(node.id);
  if (output2.length >= maxNodes) {
    return output2;
  }
  if (node.type !== "DOCUMENT" && node.type !== "CANVAS") {
    output2.push({ id: node.id, name: node.name });
  }
  if (output2.length >= maxNodes) {
    return output2;
  }
  if (node.children && Array.isArray(node.children)) {
    for (let i = 0; i < Math.min(node.children.length, 15); i++) {
      if (output2.length >= maxNodes) {
        break;
      }
      const child = node.children[i];
      if (child) {
        collectAllExportableIds(child, output2, maxNodes, visited);
      }
    }
  }
  return output2;
};
var chunks = (items, size) => {
  const result = [];
  for (let i = 0; i < items.length; i += size) {
    result.push(items.slice(i, i + size));
  }
  return result;
};
var fetchJson = async (url, figmaToken) => {
  const response = await fetch(url, {
    headers: {
      "X-Figma-Token": figmaToken
    }
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Falha na API do Figma (${response.status}): ${body.slice(0, 200)}`);
  }
  return await response.json();
};
var downloadSvg = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Falha ao baixar SVG (${response.status})`);
  }
  return response.text();
};
var fetchDesignTokens = async (fileKey, figmaToken) => {
  try {
    const variablesUrl = `${FIGMA_API_BASE}/files/${fileKey}/variables/local`;
    const variablesResponse = await fetch(variablesUrl, {
      headers: { "X-Figma-Token": figmaToken }
    });
    let variables = [];
    if (variablesResponse.ok) {
      const data = await variablesResponse.json();
      variables = data.variables ? Object.values(data.variables).slice(0, 50) : [];
    }
    const tokenToClassMap = {};
    for (const variable of variables.slice(0, 30)) {
      const varName = variable.name || "";
      const valuesByMode = variable.valuesByMode;
      if (!valuesByMode || Object.keys(valuesByMode).length === 0) {
        continue;
      }
      const firstModeKey = Object.keys(valuesByMode)[0];
      const rawValue = valuesByMode[firstModeKey];
      const varValue = rawValue === void 0 || rawValue === null ? "" : String(rawValue).trim();
      if (varValue.length === 0) {
        continue;
      }
      if (varName.includes("color") || varName.includes("Color")) {
        tokenToClassMap[varName] = `text-[${varValue}]`;
      } else if (varName.includes("spacing") || varName.includes("Spacing")) {
        tokenToClassMap[varName] = `p-${varValue}`;
      } else if (varName.includes("radius") || varName.includes("Radius")) {
        tokenToClassMap[varName] = `rounded-${varValue}`;
      } else if (varName.includes("size") || varName.includes("Size")) {
        tokenToClassMap[varName] = `w-${varValue}`;
      }
    }
    return {
      variables,
      styles: [],
      tokenToClassMap
    };
  } catch {
    return {
      variables: [],
      styles: [],
      tokenToClassMap: {}
    };
  }
};
var ensureSvgFile = async (svgContent, fileName, outputDir) => {
  const svgDir = import_node_path2.default.join(outputDir, SVG_DIR_NAME);
  await (0, import_promises2.mkdir)(svgDir, { recursive: true });
  const normalizedName = normalizeFileName(fileName);
  const filePath = import_node_path2.default.join(svgDir, `${normalizedName}.svg`);
  let shouldWrite = true;
  try {
    const existingContent = await (0, import_promises2.readFile)(filePath, "utf8");
    if (existingContent === svgContent) {
      shouldWrite = false;
    }
  } catch {
  }
  if (shouldWrite) {
    await (0, import_promises2.writeFile)(filePath, svgContent, "utf8");
  }
  return filePath;
};
var saveFigmaTokenInEnv = async (figmaToken) => {
  const envPath = import_node_path2.default.resolve(process.cwd(), ".env");
  let envContent = "";
  try {
    envContent = await (0, import_promises2.readFile)(envPath, "utf8");
  } catch (error3) {
    if (!(error3 && typeof error3 === "object" && "code" in error3 && error3.code === "ENOENT")) {
      throw error3;
    }
  }
  const tokenLine = `FIGMA_TOKEN=${figmaToken}`;
  const hasTrailingNewline = envContent.endsWith("\n");
  if (/^FIGMA_TOKEN=.*$/m.test(envContent)) {
    envContent = envContent.replace(/^FIGMA_TOKEN=.*$/m, tokenLine);
  } else {
    envContent = envContent.length === 0 ? tokenLine : `${envContent}${hasTrailingNewline ? "" : "\n"}${tokenLine}`;
  }
  await (0, import_promises2.writeFile)(envPath, `${envContent}${envContent.endsWith("\n") ? "" : "\n"}`, "utf8");
};
var isProduction = () => process.env.NODE_ENV === "production";
var loadRuntimeSecrets = async () => {
  const raw = await (0, import_promises2.readFile)(RUNTIME_SECRETS_PATH, "utf8").catch(() => void 0);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
};
var saveFigmaTokenInRuntimeSecrets = async (figmaToken) => {
  const current = await loadRuntimeSecrets();
  const next = { ...current, FIGMA_TOKEN: figmaToken };
  await (0, import_promises2.mkdir)(import_node_path2.default.dirname(RUNTIME_SECRETS_PATH), { recursive: true });
  await (0, import_promises2.writeFile)(RUNTIME_SECRETS_PATH, `${JSON.stringify(next, null, 2)}
`, "utf8");
};
var resolveFigmaToken = async () => {
  const fromEnv = process.env.FIGMA_TOKEN?.trim();
  if (fromEnv) return fromEnv;
  if (!isProduction()) return void 0;
  const secrets = await loadRuntimeSecrets();
  const fromSecrets = secrets.FIGMA_TOKEN?.trim();
  if (fromSecrets) {
    process.env.FIGMA_TOKEN = fromSecrets;
  }
  return fromSecrets;
};
var promptForFigmaToken = async () => {
  const rl = readline.createInterface({ input: import_process.stdin, output: import_process.stdout });
  try {
    const token = (await rl.question("Cole aqui o token do Figma: ")).trim();
    if (!token) {
      throw new Error("FIGMA_TOKEN nao informada.");
    }
    if (isProduction()) {
      await saveFigmaTokenInRuntimeSecrets(token);
    } else {
      await saveFigmaTokenInEnv(token);
    }
    process.env.FIGMA_TOKEN = token;
    return token;
  } finally {
    rl.close();
  }
};
var downloadFigmaSvgs = async (options) => {
  let figmaToken = await resolveFigmaToken();
  if (!figmaToken) {
    options.onProgress?.("FIGMA_TOKEN nao encontrada. Solicitar token no terminal...");
    figmaToken = await promptForFigmaToken();
    options.onProgress?.(
      isProduction() ? "FIGMA_TOKEN salva em armazenamento seguro local (producao)." : "FIGMA_TOKEN salva em .env com sucesso."
    );
  }
  const { fileKey, nodeId } = parseFigmaUrl(options.figmaUrl);
  let fileTokens;
  try {
    options.onProgress?.("Buscando tokens de design do Figma...");
    fileTokens = await fetchDesignTokens(fileKey, figmaToken);
    if (Object.keys(fileTokens.tokenToClassMap).length > 0) {
      options.onProgress?.(
        `Encontrados ${Object.keys(fileTokens.tokenToClassMap).length} tokens de design`
      );
    }
  } catch {
    options.onProgress?.("Aviso: nao foi possivel carregar tokens de design");
  }
  if (nodeId) {
    options.onProgress?.("Buscando componente especifico do Figma...");
    const imagesResponse = await fetchJson(
      `${FIGMA_API_BASE}/images/${fileKey}?ids=${encodeURIComponent(nodeId)}&format=svg`,
      figmaToken
    );
    const renderUrl = imagesResponse.images?.[nodeId];
    if (!renderUrl) {
      throw new Error(`Nao foi possivel renderizar o node-id ${nodeId}.`);
    }
    let nodeName = `figma-node-${nodeId.replace(/:/g, "-")}`;
    let designInfo;
    try {
      const nodeDetails = await fetchJson(
        `${FIGMA_API_BASE}/files/${fileKey}/nodes?ids=${encodeURIComponent(nodeId)}&depth=4`,
        figmaToken
      );
      const docNode = nodeDetails.nodes?.[nodeId]?.document;
      if (docNode) {
        if (docNode.name && docNode.name.trim().length > 0) {
          nodeName = docNode.name;
        }
        designInfo = extractDesignInfo(docNode);
      }
    } catch {
    }
    options.onProgress?.("Baixando SVG do componente selecionado...");
    const svgContent = await downloadSvg(renderUrl);
    const assetsDir = options.assetsDir ?? process.cwd();
    const filePath = await ensureSvgFile(svgContent, nodeName, assetsDir);
    const relativePath = import_node_path2.default.relative(process.cwd(), filePath).split(import_node_path2.default.sep).join("/");
    return [
      {
        name: toVueComponentName(nodeName),
        path: relativePath,
        content: svgContent,
        designInfo,
        designTokens: fileTokens
      }
    ];
  }
  options.onProgress?.("Buscando documento do Figma...");
  try {
    const fileResponse = await fetchJson(
      `${FIGMA_API_BASE}/files/${fileKey}?depth=2`,
      figmaToken
    );
    if (!fileResponse.document) {
      throw new Error("Documento nao encontrado no Figma.");
    }
    let exportableNodeInfo = collectExportableNodeIds(fileResponse.document);
    if (exportableNodeInfo.length === 0) {
      options.onProgress?.("Tentando coleta alternativa de elementos...");
      exportableNodeInfo = collectAllExportableIds(fileResponse.document);
    }
    if (exportableNodeInfo.length === 0) {
      throw new Error("Nenhum node exportavel encontrado no documento.");
    }
    if (exportableNodeInfo.length >= 20) {
      options.onProgress?.(`Encontrados muitos assets. Usando apenas os primeiros 20...`);
    } else {
      options.onProgress?.(
        `Encontrados ${exportableNodeInfo.length} assets. Gerando IDs de renderizacao...`
      );
    }
    const nodeIds = exportableNodeInfo.map((node) => node.id);
    const nodeNames = new Map(exportableNodeInfo.map((node) => [node.id, node.name]));
    const nodeChunks = chunks(nodeIds, 100);
    const renderUrls = {};
    for (const nodeChunk of nodeChunks) {
      const nodeChunkParams = nodeChunk.map((id) => `ids=${encodeURIComponent(id)}`).join("&");
      const imagesResponse = await fetchJson(
        `${FIGMA_API_BASE}/images/${fileKey}?${nodeChunkParams}&format=svg`,
        figmaToken
      );
      if (!imagesResponse.images) {
        throw new Error("Nao foi possivel obter URLs de renderizacao.");
      }
      Object.assign(renderUrls, imagesResponse.images);
    }
    options.onProgress?.("Baixando SVGs...");
    const assets = [];
    const assetsDir = options.assetsDir ?? process.cwd();
    for (const nodeId2 of nodeIds) {
      const renderUrl = renderUrls[nodeId2];
      const nodeName = nodeNames.get(nodeId2);
      if (!nodeName) {
        continue;
      }
      if (!renderUrl) {
        options.onProgress?.(`Pulando ${nodeName} (sem URL de renderizacao)`);
        continue;
      }
      try {
        const svgContent = await downloadSvg(renderUrl);
        const filePath = await ensureSvgFile(svgContent, nodeName, assetsDir);
        const relativePath = import_node_path2.default.relative(process.cwd(), filePath).split(import_node_path2.default.sep).join("/");
        let nodeDesignInfo;
        try {
          const nodeDetails = await fetchJson(
            `${FIGMA_API_BASE}/files/${fileKey}/nodes?ids=${encodeURIComponent(nodeId2)}&depth=4`,
            figmaToken
          );
          const docNode = nodeDetails.nodes?.[nodeId2]?.document;
          if (docNode) {
            nodeDesignInfo = extractDesignInfo(docNode);
          }
        } catch {
        }
        const componentName = toVueComponentName(nodeName);
        assets.push({
          name: componentName,
          path: relativePath,
          content: svgContent,
          designInfo: nodeDesignInfo,
          designTokens: fileTokens
        });
        options.onProgress?.(`Downloaded: ${nodeName}`);
      } catch (error3) {
        const message2 = error3 instanceof Error ? error3.message : String(error3);
        options.onProgress?.(`Erro ao baixar ${nodeName}: ${message2}`);
      }
    }
    return assets;
  } catch (error3) {
    if (error3 instanceof Error && error3.message.includes("string longer than")) {
      throw new Error(
        "Documento do Figma muito grande. Tente com um arquivo menor ou use SVG local."
      );
    }
    throw error3;
  }
};

// src/integrations/svg-upload.ts
var import_promises3 = require("node:fs/promises");
var import_node_path3 = __toESM(require("node:path"), 1);
var SVG_DIR_NAME2 = "svg";
var normalizeFileName2 = (value) => {
  const normalized = value.normalize("NFD").replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-").toLowerCase();
  return normalized || "asset";
};
var isValidSvgPath = (svgFilePath) => {
  const normalized = svgFilePath.trim().toLowerCase();
  return normalized.endsWith(".svg") && normalized.length > 4;
};
var listSvgFilesInDirectory = async (directoryPath) => {
  const absoluteDirectory = import_node_path3.default.resolve(directoryPath);
  await (0, import_promises3.mkdir)(absoluteDirectory, { recursive: true });
  const entries = await (0, import_promises3.readdir)(absoluteDirectory, { withFileTypes: true });
  return entries.filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".svg")).map((entry) => import_node_path3.default.join(absoluteDirectory, entry.name)).sort((a, b) => a.localeCompare(b));
};
var uploadSvgFromFile = async (options) => {
  const sourcePath = import_node_path3.default.resolve(options.svgFilePath.trim());
  if (!isValidSvgPath(sourcePath)) {
    throw new Error("Arquivo invalido. Informe um caminho para arquivo .svg.");
  }
  options.onProgress?.("Lendo arquivo SVG informado...");
  const svgContent = await (0, import_promises3.readFile)(sourcePath, "utf8");
  if (!svgContent.includes("<svg")) {
    throw new Error("Arquivo SVG invalido: tag <svg> nao encontrada.");
  }
  const rootAssetsDir = options.assetsDir ?? import_node_path3.default.resolve(process.cwd(), "src");
  const svgDir = import_node_path3.default.join(rootAssetsDir, SVG_DIR_NAME2);
  await (0, import_promises3.mkdir)(svgDir, { recursive: true });
  const originalName = import_node_path3.default.parse(sourcePath).name;
  const normalizedName = normalizeFileName2(originalName);
  const destinationPath = import_node_path3.default.join(svgDir, `${normalizedName}.svg`);
  let shouldWrite = true;
  try {
    const existingContent = await (0, import_promises3.readFile)(destinationPath, "utf8");
    if (existingContent === svgContent) {
      shouldWrite = false;
      options.onProgress?.("Cache de SVG utilizado, sem novo download.");
    }
  } catch {
  }
  if (shouldWrite) {
    options.onProgress?.("Copiando SVG para src/svg/...");
    await (0, import_promises3.writeFile)(destinationPath, svgContent, "utf8");
  }
  const relativePath = import_node_path3.default.relative(process.cwd(), destinationPath).split(import_node_path3.default.sep).join("/");
  return [
    {
      name: normalizedName,
      path: relativePath,
      content: svgContent
    }
  ];
};

// src/mcp/pipeline.ts
var import_promises4 = require("node:fs/promises");
var import_node_path4 = __toESM(require("node:path"), 1);

// src/llm/llm-client.ts
var generateTemplate = async (prompt, model) => {
  const selectedModel = model || process.env.COPILOT_MODEL || "gpt-5-mini";
  const messages = [
    {
      role: "system",
      content: "Voce gera codigo Vue com foco em templates limpos e semanticos. Siga estritamente as regras fornecidas."
    },
    {
      role: "user",
      content: prompt
    }
  ];
  const content = await copilotRuntime.runModel(
    {
      messages,
      temperature: 0
    },
    selectedModel
  );
  if (!content) {
    throw new Error("A LLM nao retornou conteudo para o template.");
  }
  return content;
};

// src/mcp/design-system-tokens.ts
var enrichClassesWithTokens = (baseClasses, designTokens) => {
  if (!designTokens || !designTokens.tokenToClassMap) {
    return baseClasses;
  }
  const enriched = [...baseClasses];
  const tokenClasses = Object.values(designTokens.tokenToClassMap).filter(Boolean);
  for (const tokenClass of tokenClasses) {
    if (!enriched.includes(tokenClass)) {
      enriched.push(tokenClass);
    }
  }
  return enriched.slice(0, 12);
};

// src/mcp/context-builder.ts
var toPascalCase = (value) => {
  return value.split(/[^a-zA-Z0-9]+/).filter(Boolean).map((part) => part[0].toUpperCase() + part.slice(1).toLowerCase()).join("");
};
var SVG_LLM_MAX_CHARS = 1e4;
var minifySvgForLlm = (svgContent) => {
  return svgContent.replace(/>\s+</g, "><").replace(/\s{2,}/g, " ").trim();
};
var getSvgContentForLlm = (svgContent) => {
  const minified = minifySvgForLlm(svgContent);
  return minified.length <= SVG_LLM_MAX_CHARS ? minified : void 0;
};
var nearest = (value, candidates) => {
  return candidates.reduce(
    (prev, curr) => Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
};
var spacingClass = (prefix, value) => {
  if (value === void 0 || !Number.isFinite(value)) return void 0;
  const scale = {
    0: "0",
    2: "0.5",
    4: "1",
    6: "1.5",
    8: "2",
    10: "2.5",
    12: "3",
    14: "3.5",
    16: "4",
    20: "5",
    24: "6",
    28: "7",
    32: "8",
    40: "10",
    48: "12",
    56: "14",
    64: "16"
  };
  const px = nearest(value, Object.keys(scale).map(Number));
  return `${prefix}-${scale[px]}`;
};
var textSizeClass = (fontSize) => {
  if (!fontSize || !Number.isFinite(fontSize)) return void 0;
  const map = {
    12: "text-xs",
    14: "text-sm",
    16: "text-base",
    18: "text-lg",
    20: "text-xl",
    24: "text-2xl",
    30: "text-3xl",
    36: "text-4xl"
  };
  const px = nearest(fontSize, Object.keys(map).map(Number));
  return map[px];
};
var fontWeightClass = (weight) => {
  if (!weight || !Number.isFinite(weight)) return void 0;
  if (weight >= 700) return "font-bold";
  if (weight >= 600) return "font-semibold";
  if (weight >= 500) return "font-medium";
  if (weight >= 400) return "font-normal";
  return "font-light";
};
var radiusClass = (radius) => {
  if (radius === void 0 || !Number.isFinite(radius)) return void 0;
  const map = {
    0: "rounded-none",
    2: "rounded-sm",
    4: "rounded",
    6: "rounded-md",
    8: "rounded-lg",
    12: "rounded-xl",
    16: "rounded-2xl",
    24: "rounded-3xl"
  };
  const px = nearest(radius, Object.keys(map).map(Number));
  return map[px];
};
var toTailwindHints = (asset) => {
  const design = asset.designInfo;
  if (!design) return void 0;
  const containerClasses = /* @__PURE__ */ new Set();
  const typographyClasses = /* @__PURE__ */ new Set();
  const colorClasses = /* @__PURE__ */ new Set();
  const notes = [];
  if (design.layout.mode === "HORIZONTAL") containerClasses.add("flex flex-row");
  if (design.layout.mode === "VERTICAL") containerClasses.add("flex flex-col");
  const pad = design.layout.padding;
  if (pad) {
    const px = spacingClass("px", (pad.left + pad.right) / 2);
    const py = spacingClass("py", (pad.top + pad.bottom) / 2);
    if (px) containerClasses.add(px);
    if (py) containerClasses.add(py);
  }
  const gap = spacingClass("gap", design.layout.gap);
  if (gap) containerClasses.add(gap);
  const radius = radiusClass(design.layout.cornerRadius);
  if (radius) containerClasses.add(radius);
  for (const color of design.colors.slice(0, 6)) {
    colorClasses.add(`bg-[${color}]`);
    colorClasses.add(`text-[${color}]`);
    colorClasses.add(`border-[${color}]`);
  }
  for (const typo of design.typography.slice(0, 8)) {
    const size = textSizeClass(typo.fontSize);
    const weight = fontWeightClass(typo.fontWeight);
    if (size) typographyClasses.add(size);
    if (weight) typographyClasses.add(weight);
  }
  const styleRefKeys = Object.keys(design.styleRefs);
  if (styleRefKeys.length > 0) {
    notes.push(`styleRefs figma detectados: ${styleRefKeys.join(", ")}`);
  }
  const containerArray = enrichClassesWithTokens(Array.from(containerClasses), asset.designTokens);
  const colorArray = enrichClassesWithTokens(Array.from(colorClasses), asset.designTokens);
  if (asset.designTokens?.tokenToClassMap && Object.keys(asset.designTokens.tokenToClassMap).length > 0) {
    notes.push(
      `design-tokens mapeados: ${Object.keys(asset.designTokens.tokenToClassMap).length} tokens encontrados`
    );
  }
  return {
    containerClasses: containerArray.slice(0, 10),
    typographyClasses: Array.from(typographyClasses),
    colorClasses: colorArray.slice(0, 10),
    notes
  };
};
var summarizeSvgContent = (svgContent) => {
  const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
  const widthMatch = svgContent.match(/\bwidth="([^"]+)"/);
  const heightMatch = svgContent.match(/\bheight="([^"]+)"/);
  const colors = /* @__PURE__ */ new Set();
  const colorRegex = /(?:fill|stroke)="(none|#[0-9a-fA-F]{3,8}|rgb[^"]+)"/g;
  let m;
  while ((m = colorRegex.exec(svgContent)) !== null) {
    if (m[1] !== "none") colors.add(m[1]);
  }
  const pathCount = (svgContent.match(/<path/g) ?? []).length;
  const rectCount = (svgContent.match(/<rect/g) ?? []).length;
  const textCount = (svgContent.match(/<text/g) ?? []).length;
  const circleCount = (svgContent.match(/<circle/g) ?? []).length;
  const groupCount = (svgContent.match(/<g[\s>]/g) ?? []).length;
  const parts = ["[SVG RESUMIDO - use o campo path para referenciar o arquivo]"];
  if (widthMatch?.[1] || heightMatch?.[1])
    parts.push(`dimensoes: ${widthMatch?.[1] ?? "?"} x ${heightMatch?.[1] ?? "?"}`);
  if (viewBoxMatch?.[1]) parts.push(`viewBox: ${viewBoxMatch[1]}`);
  if (colors.size) parts.push(`cores: ${Array.from(colors).join(", ")}`);
  parts.push(
    `elementos: ${pathCount} paths, ${rectCount} rects, ${circleCount} circles, ${textCount} texts, ${groupCount} grupos`
  );
  return parts.join(" | ");
};
var buildContext = (sdd, assets) => {
  const vueAssetHints = assets.map((asset) => ({
    assetName: asset.name,
    filePath: asset.path,
    suggestedComponent: `${toPascalCase(asset.name)}Icon`
  }));
  const assetsForLlm = assets.map((asset) => ({
    name: asset.name,
    path: asset.path,
    designInfo: asset.designInfo,
    svgSummary: asset.content ? summarizeSvgContent(asset.content) : void 0,
    svgContentForLlm: asset.content ? getSvgContentForLlm(asset.content) : void 0,
    tailwindHints: toTailwindHints(asset),
    designTokens: asset.designTokens
  }));
  return {
    sdd,
    assets: assetsForLlm,
    vueAssetHints,
    metadata: {
      generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      assetsCount: assets.length
    }
  };
};

// src/mcp/prompt-builder.ts
var buildPrompt = (context) => {
  return `
Voce e um especialista em Vue 3 e geracao de componentes para frontend.

Sua tarefa e gerar um componente Vue 3 completo e funcional, usando o SVG como REFERENCIA DE DESIGN.

O SVG fornecido e um wireframe ou componente visual. Voce deve interpretar o que ele representa
(botao, card, banner, formulario, lista, stepper, etc.) e gerar o componente Vue equivalente
com HTML semantico e TailwindCSS.

Regras obrigatorias:
1. Retorne APENAS o codigo Vue puro, sem markdown, sem blocos de codigo (sem \`\`\`), sem texto explicativo.
2. O componente deve conter obrigatoriamente as duas secoes: <template> e <script setup>.
3. Declare no <script setup> TODAS as variaveis, refs, computed e funcoes referenciadas no template.
4. Use HTML semantico (button, input, section, header, nav, article, ul, li, form, etc.).
5. Use diretivas Vue quando fizer sentido (v-if, v-for, :class, @click, v-model).
6. Use EXCLUSIVAMENTE TailwindCSS para estilizacao. PROIBIDO: style inline, CSS customizado, bloco <style>.
7. PROIBIDO: <img> apontando para o SVG, import do arquivo SVG.
8. Prioridade: fidelidade visual alta em relacao ao SVG do Figma.

Como interpretar os dados do asset para gerar o componente:
- "tailwindHints": conjunto de classes geradas deterministicamente a partir dos dados reais do Figma. PRIORIZE estas classes no output.
- "designTokens": (modo precis\xE3o m\xE1xima) mapeamento de tokens globais do projeto Figma para classes Tailwind. Quando presente, use essas classes como primeira opcao antes de gerar classes ad-hoc.
  - "tokenToClassMap": registro de token -> classe. Ex: {'primary-color': 'bg-[#004415]', 'spacing-md': 'p-4'}. Use diretamente.
  - Se um elemento pertencer a um token conhecido (ex: um header com fill = color do token "primary-color"), aplique a classe mapeada.
- "designInfo.styleRefs": IDs reais de estilos do Figma (fill, text, effect). Use esses IDs como referencia para manter consistencia visual entre elementos semelhantes.
- "svgContentForLlm": quando presente, este e o SVG minificado real. Use esse conteudo para reproduzir visualmente o componente com alta fidelidade.
  - Nesse caso, preferencialmente mantenha o <svg> inline dentro do <template> (sem <img>) e envolva com estrutura semantica + classes Tailwind.
  - Se houver textos/interacoes fora do SVG, complemente com HTML semantico.
- "svgSummary": fallback quando nao houver "svgContentForLlm".
- "designInfo.texts": textos reais extraidos do SVG \u2014 use-os como conteudo literal dos elementos HTML.
- "designInfo.layout": HORIZONTAL = flex flex-row | VERTICAL = flex flex-col.
- "designInfo.typography": mapeie fontSize/fontWeight para classes Tailwind (text-sm, text-lg, font-bold, etc.).
- Interprete o tipo de componente pelo contexto visual: retangulo largo + textos = banner/header; campos + labels = form; itens repetidos = lista/stepper; icone + numero = stat card.
- Nao gerar placeholders genericos. Se faltar informacao, use os dados presentes no contexto (cores, textos, dimensoes) antes de inferir.
- Nao invente classes aleatorias se "tailwindHints" fornecer classes candidatas.

Exemplos de mapeamento SVG -> componente:
- SVG com banner verde largo + textos brancos -> <section> com background Tailwind + <h1> + <p>
- SVG com steps numerados -> stepper com <ol> e v-for
- SVG com campos de entrada -> <form> com <input> e <label>
- SVG com icone + valor monetario -> stat card com <div> estruturado

Formato de saida esperado (exatamente assim, sem nada antes ou depois):
<template>
  ...
</template>

<script setup>
  ...
</script>

Contexto SDD + Assets:
${JSON.stringify(context, null, 2)}
`;
};

// src/mcp/pipeline.ts
var extractSections = (raw) => {
  const cleanRaw = raw.trim().replace(/^```[a-zA-Z]*\n?/g, "").replace(/```$/g, "").trim();
  const templateMatch = cleanRaw.match(/<template>([\s\S]*)<\/template>/i);
  const scriptMatch = cleanRaw.match(/<script\b[^>]*>([\s\S]*)<\/script>/i);
  const fallbackBody = cleanRaw.replace(/^<template>\s*/i, "").replace(/\s*<\/template>[\s\S]*$/i, "").trim();
  return {
    templateBody: templateMatch?.[1]?.trim() ?? fallbackBody,
    scriptBody: scriptMatch?.[1]?.trim() ?? ""
  };
};
var createVueFileContent = (templateBody, scriptBody) => {
  const script = scriptBody || "// sem variaveis";
  return `<template>
${templateBody}
</template>

<script setup>
${script}
</script>
`;
};
var toFriendlyWriteError = (error3, outputDir) => {
  if (error3 && typeof error3 === "object" && "code" in error3 && error3.code === "EACCES") {
    return new Error(
      `Sem permissao para escrever em '${outputDir}'. Use um caminho dentro do projeto, por exemplo './output'.`
    );
  }
  return error3 instanceof Error ? error3 : new Error(String(error3));
};
var runPipeline = async (options) => {
  options.hooks?.onStage?.("read-sdd");
  const sddRaw = await (0, import_promises4.readFile)(options.sddPath, "utf8");
  const sdd = JSON.parse(sddRaw);
  options.hooks?.onStage?.("process-svg");
  options.hooks?.onStage?.("upload-svg");
  const assets = await uploadSvgFromFile({
    svgFilePath: options.svgFilePath,
    assetsDir: options.assetsDir,
    onProgress: options.hooks?.onProgress
  });
  options.hooks?.onStage?.("build-context");
  const context = buildContext(sdd, assets);
  options.hooks?.onStage?.("build-prompt");
  const prompt = buildPrompt(context);
  options.hooks?.onStage?.("call-llm");
  const llmResult = await generateTemplate(prompt, options.llmModel);
  const { templateBody, scriptBody } = extractSections(llmResult);
  const vueFileContent = createVueFileContent(templateBody, scriptBody);
  options.hooks?.onStage?.("save-file");
  const outputFileName = options.outputFileName ?? "generated-template.vue";
  const outputFilePath = import_node_path4.default.resolve(options.outputDir, outputFileName);
  try {
    await (0, import_promises4.mkdir)(options.outputDir, { recursive: true });
    await (0, import_promises4.writeFile)(outputFilePath, vueFileContent, "utf8");
  } catch (error3) {
    throw toFriendlyWriteError(error3, options.outputDir);
  }
  return {
    outputFilePath,
    template: templateBody,
    assets
  };
};

// src/index.ts
var { Input, Select, Confirm } = import_enquirer.default;
var DEFAULT_RUNTIME_SECRETS_PATH = import_node_path5.default.resolve(
  process.env.HOME || process.cwd(),
  ".mcp-frontend",
  "secrets.json"
);
var stageMessages = {
  "read-sdd": "Lendo SDD...",
  "process-svg": "Processando arquivo SVG...",
  "upload-svg": "Copiando SVG para src/svg...",
  "build-context": "Construindo contexto...",
  "build-prompt": "Gerando prompt...",
  "call-llm": "Chamando LLM...",
  "save-file": "Salvando arquivo..."
};
var getConfiguredModel = () => process.env.COPILOT_MODEL || "gpt-5-mini";
var printHeader = () => {
  const title = `${source_default.bold.cyan("MCP Frontend CLI")}
${source_default.gray("Geracao de template Vue a partir de SDD + SVG")}`;
  console.log(boxen(title, { borderStyle: "round", borderColor: "cyan", padding: 1 }));
};
var askMainMenuChoice = async () => {
  const choice = await new Select({
    name: "mainMenu",
    message: "Menu principal",
    choices: [
      {
        name: "generate",
        message: "Gerar template Vue",
        hint: "Fluxo principal"
      },
      {
        name: "configure-llm",
        message: `Configurar IA (${getConfiguredModel()})`,
        hint: "Ajustar modelo padrao"
      },
      {
        name: "configure-secrets",
        message: "Configurar tokens e segredos",
        hint: "FIGMA_TOKEN (apenas para Figma)"
      },
      {
        name: "configure-all",
        message: "Configurar tudo antes de gerar",
        hint: "Modelo + Tokens"
      },
      {
        name: "exit",
        message: "Sair",
        hint: "Fechar o CLI"
      }
    ]
  }).run();
  return choice;
};
var askSvgSelection = async (svgDir) => {
  const svgFiles = await listSvgFilesInDirectory(svgDir);
  if (svgFiles.length === 0) {
    throw new Error(
      `Nenhum arquivo .svg encontrado em: ${svgDir}. Adicione um SVG nessa pasta e rode novamente.`
    );
  }
  const selectedFile = await new Select({
    name: "svgSelection",
    message: "Selecione o arquivo SVG",
    choices: svgFiles.map((filePath) => ({
      name: filePath,
      message: import_node_path5.default.basename(filePath)
    }))
  }).run();
  return selectedFile;
};
var askSourceType = async () => {
  const choice = await new Select({
    name: "sourceType",
    message: "Escolha a fonte do SVG",
    choices: [
      {
        name: "local",
        message: "Usar SVG local da pasta src/svg"
      },
      {
        name: "figma",
        message: "Baixar de um link do Figma"
      },
      {
        name: "back",
        message: "\u21A9 Voltar ao menu principal"
      }
    ]
  }).run();
  return choice;
};
var formatModelLabel = (model) => {
  const capabilities = [];
  if (model.capabilities.reasoning) {
    capabilities.push("reasoning");
  }
  if (model.capabilities.vision) {
    capabilities.push("vision");
  }
  return capabilities.length > 0 ? `${model.name} (${capabilities.join(", ")})` : model.name;
};
var askModelSelection = async (models) => {
  if (models.length === 0) {
    throw new Error("Nenhum modelo disponivel foi retornado pelo Copilot.");
  }
  const defaultModel = process.env.COPILOT_MODEL || models[0]?.id || "gpt-5-mini";
  const choices = models.map((model) => {
    const defaultSuffix = model.id === defaultModel ? " [padrao]" : "";
    return {
      name: model.id,
      message: `${formatModelLabel(model)} - ${model.id}${defaultSuffix}`
    };
  });
  const selectedModel = await new Select({
    name: "llmModel",
    message: "Escolha o modelo de IA",
    choices,
    initial: Math.max(
      models.findIndex((model) => model.id === defaultModel),
      0
    )
  }).run();
  return selectedModel;
};
var askOutputDir = async (defaultOutputDir) => {
  const outputValue = await new Input({
    name: "outputDir",
    message: "Caminho de saida",
    initial: defaultOutputDir
  }).run();
  return import_node_path5.default.resolve(outputValue.trim() || defaultOutputDir);
};
var showSummary = async (items) => {
  const lines = Object.entries(items).map(([key, value]) => `${source_default.cyan(key)}: ${source_default.cyan(value)}`);
  console.log(
    boxen(lines.join("\n"), {
      borderColor: "magenta",
      padding: 1,
      margin: 1,
      borderStyle: "round"
    })
  );
};
var parseCliOutputDir = () => {
  const args = process.argv.slice(2).map((value) => value.trim()).filter(Boolean);
  if (args.length === 0) {
    return void 0;
  }
  const inlineOutputArg = args.find((arg) => arg.startsWith("--output="));
  if (inlineOutputArg) {
    const value = inlineOutputArg.slice("--output=".length).trim();
    return value ? import_node_path5.default.resolve(value) : void 0;
  }
  const outputFlagIndex = args.findIndex((arg) => arg === "--output" || arg === "-o");
  if (outputFlagIndex >= 0) {
    const value = args[outputFlagIndex + 1]?.trim();
    if (value && !value.startsWith("-")) {
      return import_node_path5.default.resolve(value);
    }
    return void 0;
  }
  const firstArg = args[0];
  if (firstArg.startsWith("-")) {
    return void 0;
  }
  return import_node_path5.default.resolve(firstArg);
};
var askFigmaUrl = async () => {
  const figmaUrl = await new Input({
    name: "figmaUrl",
    message: "Cole o link do Figma"
  }).run();
  return figmaUrl.trim();
};
var askTokenValue = async (label) => {
  const token = await new Input({
    name: `${label}Token`,
    message: `Informe o token do ${label} (ou deixe vazio para voltar)`
  }).run();
  return token.trim();
};
var askAssetSelection = async (assets) => {
  const selectedPath = await new Select({
    name: "downloadedSvg",
    message: "Selecione qual SVG usar",
    choices: assets.map((asset) => ({
      name: asset.path,
      message: asset.name
    }))
  }).run();
  return selectedPath;
};
var saveEnvVar = async (key, value) => {
  const envPath = import_node_path5.default.resolve(process.cwd(), ".env");
  let envContent = "";
  try {
    envContent = await (0, import_promises5.readFile)(envPath, "utf8");
  } catch (error3) {
    if (!(error3 && typeof error3 === "object" && "code" in error3 && error3.code === "ENOENT")) {
      throw error3;
    }
  }
  const line = `${key}=${value}`;
  const hasTrailingNewline = envContent.endsWith("\n");
  const keyRegex = new RegExp(`^${key}=.*$`, "m");
  if (keyRegex.test(envContent)) {
    envContent = envContent.replace(keyRegex, line);
  } else {
    envContent = envContent.length === 0 ? line : `${envContent}${hasTrailingNewline ? "" : "\n"}${line}`;
  }
  await (0, import_promises5.writeFile)(envPath, `${envContent}${envContent.endsWith("\n") ? "" : "\n"}`, "utf8");
};
var loadRuntimeSecrets2 = async () => {
  const raw = await (0, import_promises5.readFile)(DEFAULT_RUNTIME_SECRETS_PATH, "utf8").catch(() => void 0);
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    return parsed;
  } catch {
    return {};
  }
};
var saveRuntimeSecrets = async (updates) => {
  const current = await loadRuntimeSecrets2();
  const merged = { ...current, ...updates };
  await (0, import_promises5.mkdir)(import_node_path5.default.dirname(DEFAULT_RUNTIME_SECRETS_PATH), { recursive: true });
  await (0, import_promises5.writeFile)(DEFAULT_RUNTIME_SECRETS_PATH, `${JSON.stringify(merged, null, 2)}
`, "utf8");
};
var isProduction2 = () => process.env.NODE_ENV === "production";
var persistSecret = async (key, value) => {
  if (isProduction2()) {
    await saveRuntimeSecrets({ [key]: value });
  } else {
    await saveEnvVar(key, value);
  }
  process.env[key] = value;
};
var resolveSecretFromStore = async (key) => {
  const fromEnv = process.env[key]?.trim();
  if (fromEnv) return fromEnv;
  if (!isProduction2()) return void 0;
  const secrets = await loadRuntimeSecrets2();
  const fromStore = secrets[key]?.trim();
  if (fromStore) {
    process.env[key] = fromStore;
  }
  return fromStore;
};
var ensureCopilotConnection = async () => {
  divider("Conexao Copilot");
  const authLoading = loading("Autenticando no Copilot...");
  try {
    await copilotRuntime.auth.getValidAccessToken();
    authLoading.stop();
    await success2("Copilot autenticado com sucesso.");
  } catch (exception) {
    authLoading.stop();
    throw exception;
  }
};
var ensureFigmaToken = async () => {
  const existing = await resolveSecretFromStore("FIGMA_TOKEN");
  if (existing) {
    return;
  }
  divider("Configuracao de Tokens");
  await message("FIGMA_TOKEN nao encontrado.");
  const token = await askTokenValue("Figma");
  if (!token) {
    throw new Error("Token do Figma invalido.");
  }
  await persistSecret("FIGMA_TOKEN", token);
  await success2("FIGMA_TOKEN configurado com sucesso.");
};
var saveConfiguredModel = async (model) => {
  await saveEnvVar("COPILOT_MODEL", model);
  process.env.COPILOT_MODEL = model;
};
var configureLlmModel = async () => {
  divider("Configuracao IA");
  const modelsLoading = loading("Buscando modelos de IA...");
  const models = await copilotRuntime.fetchModels();
  modelsLoading.stop();
  const selectedModel = await askModelSelection(models);
  await saveConfiguredModel(selectedModel);
  await success2(`Modelo salvo: ${selectedModel}`);
  return true;
};
var configureFigmaToken = async () => {
  divider("Configuracao FIGMA");
  await message("Vamos configurar seu FIGMA_TOKEN.");
  const token = await askTokenValue("Figma");
  if (!token || token === "back") {
    await message("Voltando ao menu principal...");
    return false;
  }
  await persistSecret("FIGMA_TOKEN", token);
  await success2("FIGMA_TOKEN configurado com sucesso.");
  return true;
};
var configureAll = async () => {
  divider("Configuracao Completa");
  const llmConfigured = await configureLlmModel();
  if (!llmConfigured) return false;
  const figmaConfigured = await configureFigmaToken();
  if (!figmaConfigured) return false;
  await success2("Configuracao completa realizada com sucesso.");
  return true;
};
var run = async () => {
  try {
    printHeader();
    await ensureCopilotConnection();
    let running = true;
    while (running) {
      let activeLoading;
      try {
        divider("Menu Principal");
        const menuChoice = await askMainMenuChoice();
        if (menuChoice === "configure-llm") {
          try {
            await configureLlmModel();
            await message("Voltando ao menu principal...");
          } catch (err) {
            const errMsg = err instanceof Error ? err.message : String(err);
            await error2(`Erro na configura\xE7\xE3o: ${errMsg}`);
          }
          continue;
        }
        if (menuChoice === "configure-secrets") {
          try {
            const configured = await configureFigmaToken();
            if (configured) {
              await message("Voltando ao menu principal...");
            }
          } catch (err) {
            const errMsg = err instanceof Error ? err.message : String(err);
            await error2(`Erro na configura\xE7\xE3o: ${errMsg}`);
          }
          continue;
        }
        if (menuChoice === "configure-all") {
          try {
            const configured = await configureAll();
            if (configured) {
              await message("Voltando ao menu principal...");
            }
          } catch (err) {
            const errMsg = err instanceof Error ? err.message : String(err);
            await error2(`Erro na configura\xE7\xE3o: ${errMsg}`);
          }
          continue;
        }
        if (menuChoice === "exit") {
          await message("Saindo do MCP Frontend CLI. At\xE9 a pr\xF3xima!");
          running = false;
          continue;
        }
        try {
          const defaultOutputDir = import_node_path5.default.resolve(process.cwd(), "output");
          const outputDirFromCli = parseCliOutputDir();
          const outputDir = outputDirFromCli ?? await askOutputDir(defaultOutputDir);
          if (outputDirFromCli) {
            await message(`Caminho de saida via CLI: ${outputDir}`);
          }
          const llmModel = getConfiguredModel();
          await message(`IA configurada: ${llmModel}`);
          const sourceType = await askSourceType();
          if (sourceType === "back") {
            await message("Voltando ao menu principal...");
            continue;
          }
          divider(sourceType === "local" ? "Origem Local" : "Origem Figma");
          const assetsDir = import_node_path5.default.resolve(process.cwd(), "src");
          let svgFilePath;
          if (sourceType === "local") {
            const svgDir = import_node_path5.default.resolve(process.cwd(), "src/svg");
            svgFilePath = await askSvgSelection(svgDir);
            if (!isValidSvgPath(svgFilePath)) {
              throw new Error("Arquivo SVG invalido. Informe um caminho para arquivo com extensao .svg.");
            }
          } else {
            await ensureFigmaToken();
            const figmaUrl = await askFigmaUrl();
            activeLoading = loading("Baixando SVGs do Figma...");
            const assets = await downloadFigmaSvgs({
              figmaUrl,
              assetsDir,
              onProgress: (message2) => {
                activeLoading?.stop();
                console.log(message2);
                activeLoading = loading("Processando...");
              }
            });
            activeLoading?.stop();
            if (assets.length === 0) {
              throw new Error("Nenhum SVG foi baixado do Figma.");
            }
            if (assets.length === 1) {
              svgFilePath = assets[0].path;
            } else {
              svgFilePath = await askAssetSelection(assets);
            }
          }
          await showSummary({
            "Diretorio de saida": outputDir,
            "Modelo IA": llmModel,
            "Fonte do SVG": sourceType === "local" ? "SVG local" : "Figma",
            "SVG selecionado": svgFilePath
          });
          const sddPath = import_node_path5.default.resolve(process.cwd(), "src/docs/sdd.json");
          const result = await runPipeline({
            sddPath,
            svgFilePath,
            outputDir,
            assetsDir,
            llmModel,
            hooks: {
              onStage: (stage) => {
                activeLoading?.stop();
                activeLoading = loading(stageMessages[stage]);
              },
              onProgress: (message2) => {
                activeLoading?.stop();
                console.log(message2);
                activeLoading = loading(stageMessages["upload-svg"]);
              }
            }
          });
          activeLoading?.stop();
          divider("Resultado");
          await success2(`Template Vue gerado com sucesso em: ${result.outputFilePath}`);
          await message(`Componentes processados: ${result.assets.length}`);
          await message("Voltando ao menu principal...");
        } catch (exception) {
          activeLoading?.stop();
          const errorMsg = exception instanceof Error ? exception.message : String(exception);
          await error2(`Falha no pipeline: ${errorMsg}`);
          await message("Voltando ao menu principal...");
        }
      } catch (exception) {
        activeLoading?.stop();
        const errorMsg = exception instanceof Error ? exception.message : String(exception);
        await error2(`Erro no menu: ${errorMsg}`);
        await message("Retornando ao menu principal...");
      }
    }
  } catch (exception) {
    const errorMsg = exception instanceof Error ? exception.message : String(exception);
    await error2(`Falha na autentica\xE7\xE3o ou no CLI: ${errorMsg}`);
    process.exitCode = 1;
  }
};
void run();
