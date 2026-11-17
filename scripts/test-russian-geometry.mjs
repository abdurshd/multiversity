// CPU geometry validation, not a rendered scene or GPU benchmark.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
const source=fs.readFileSync('src/experience/world/russia.tsx','utf8');
const subset=source.slice(source.indexOf('type V3'),source.indexOf('function Batches'));
const js=ts.transpileModule(subset,{compilerOptions:{target:ts.ScriptTarget.ES2020}}).outputText;
const {exterior,interior}=new Function('THREE','mergeGeometries',js+';return {exterior,interior}')(THREE,mergeGeometries);
for(const [label,build] of [['square',exterior],['room',interior]]) {
 const batches=build();let vertices=0;assert(batches.length<=12);
 for(const {geometry} of batches) {
  for(const attr of Object.values(geometry.attributes))for(const n of attr.array)assert(Number.isFinite(n),`${label} finite geometry`);
  geometry.computeBoundingBox();assert(!geometry.boundingBox.isEmpty());
  vertices+=geometry.attributes.position.count;geometry.dispose();
 }
 console.log(`PASS ${label}: ${batches.length} merged material batches, ${vertices} finite vertices (CPU data only)`);
}
