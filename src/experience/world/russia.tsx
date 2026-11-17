/** Stylized 1825 set, not an exact archaeological reconstruction. The later
 * Senate/Synod facade and completed St Isaac's Cathedral are intentionally absent. */
import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { Particles } from './parts';

type V3 = [number, number, number];
const colors = { stone:'#91969a', snow:'#e4e9e9', ochre:'#c1a56e', ivory:'#e2dcc5', roof:'#45545b', brass:'#be9b51', iron:'#253b46', glass:'#486a78', wood:'#59483e', green:'#344d49', paper:'#e9d6ad', red:'#82534e' };
type Finish = keyof typeof colors;
function builder() {
    const batches = new Map<Finish,THREE.BufferGeometry[]>();
    const put = (f:Finish, g:THREE.BufferGeometry, p:V3, r:V3=[0,0,0]) => {
        const transformed = g.index ? g.toNonIndexed() : g;
        transformed.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(...p),new THREE.Quaternion().setFromEuler(new THREE.Euler(...r)),new THREE.Vector3(1,1,1)));
        if(transformed!==g) g.dispose();
        if(!batches.has(f)) batches.set(f,[]);
        batches.get(f)!.push(transformed);
    };
    const box = (f:Finish,s:V3,p:V3,r?:V3) => put(f,new THREE.BoxGeometry(...s),p,r);
    const cylinder = (f:Finish,r:number,h:number,p:V3) => put(f,new THREE.CylinderGeometry(r,r,h,10),p);
    const ellipsoid = (f:Finish,s:V3,p:V3,r?:V3) => { const g=new THREE.SphereGeometry(1,10,7);g.scale(...s);put(f,g,p,r); };
    const finish = () => Array.from(batches,([material,parts])=>{ const geometry=mergeGeometries(parts)!;parts.forEach(p=>p.dispose());return {material,geometry}; });
    return {put,box,cylinder,ellipsoid,finish};
}
function exterior() {
    const {put,box,cylinder,ellipsoid,finish}=builder();
    // Snowy embankment and the frozen river, edged by granite, bollards and rails.
    box('stone',[125,.5,90],[0,.05,0]);box('snow',[124,.1,89],[0,.35,0]);
    box('glass',[300,.12,78],[0,.1,-87]);
    for(let x=-100;x<=100;x+=8) {
        box('stone',[1.1,2.7,1.1],[x,1.4,-46]);box('snow',[1.3,.18,1.3],[x,2.84,-46]);
        box('iron',[7.4,.12,.12],[x+4,1.7,-46]);box('iron',[7.4,.12,.12],[x+4,.8,-46]);
    }
    for(let x=-95;x<100;x+=19) {
        const h=15+(Math.abs(x)%3)*2;
        box('ochre',[18,h,14],[x,h/2,-143]);box('roof',[19,1,15],[x,h+.5,-143]);box('snow',[19,.18,15],[x,h+1.1,-143]);
        for(let j=-6;j<=6;j+=4)for(let y=4;y<h-1;y+=4){ box('ivory',[2.1,3.2,.3],[x+j,y,-135.85]);box('glass',[1.5,2.5,.35],[x+j,y,-135.6]); }
    }
    // A neoclassical civic wing, with a recognisable distant Admiralty-like spire.
    for(const x of [-63,63]) {
        box('ochre',[22,17,70],[x,8.5,-3]);box('ivory',[23,.8,71],[x,17,-3]);box('roof',[24,1.2,72],[x,18,-3]);box('snow',[24,.2,72],[x,18.7,-3]);
        const face=x<0?x+11.1:x-11.1;
        for(let z=-30;z<=28;z+=6){
            for(const y of [5,12]){box('ivory',[.4,4,2.7],[face,y,z]);box('glass',[.5,3.2,2],[face+(x<0?.2:-.2),y,z]);}
            cylinder('ivory',.5,15,[face+(x<0?1:-1),8,z+3]);
        }
    }
    box('ochre',[90,18,16],[35,9,-177]);box('ivory',[92,1,18],[35,18,-177]);
    box('ochre',[14,32,14],[35,20,-177]);cylinder('brass',5,7,[35,39,-177]);
    put('brass',new THREE.ConeGeometry(3.3,27,12),[35,55,-177]);
    // Monument silhouette: rearing horse and rider on a low irregular granite rock.
    const mx=-25,mz=-15;
    const rock=new THREE.IcosahedronGeometry(1,1);rock.scale(7,3.4,4.8);put('stone',rock,[mx,3.5,mz]);
    ellipsoid('green',[3.2,1.25,1.1],[mx,8.3,mz],[0,0,.35]);
    ellipsoid('green',[.8,2, .8],[mx+2.5,10,mz],[0,0,-.45]);ellipsoid('green',[1.2,.7,.6],[mx+3.5,11.3,mz]);
    for(const z of [-.7,.7]){box('green',[.5,4,.5],[mx-2,6.5,mz+z],[0,0,-.2]);box('green',[.45,2.4,.45],[mx+2,9,mz+z],[0,0,.85]);}
    cylinder('green',.65,2.1,[mx,10.1,mz]);ellipsoid('green',[.6,.65,.6],[mx,11.7,mz]);box('green',[2.7,.35,.35],[mx+1.4,10.7,mz],[0,0,.2]);
    // Standing formations: no firing, no generated historical face textures.
    for(const side of [-1,1])for(let row=0;row<3;row++)for(let i=0;i<9;i++){
        const x=side*26+i*1.6-6.4,z=-8+row*2.1;
        box(side<0?'green':'iron',[.65,1.5,.4],[x,1.65,z]);
        cylinder('paper',.28,.5,[x,2.6,z]);cylinder('iron',.34,.65,[x,3.1,z]);
        for(const dx of [-.2,.2])box('iron',[.22,.9,.24],[x+dx,.6,z]);
        box('brass',[.07,1.8,.07],[x+.55,1.7,z]);
    }
    for(const x of [-42,-10,10,42])for(const z of [-32,27]){
        cylinder('iron',.14,5,[x,2.5,z]);cylinder('iron',.5,.3,[x,5,z]);box('paper',[.55,1,.55],[x,5.6,z]);put('iron',new THREE.ConeGeometry(.65,.65,6),[x,6.4,z]);
    }
    // Courier's shelter and period carriage at the south edge.
    box('wood',[9,4,5],[-20,2,28]);box('roof',[10,.4,6],[-20,4.3,28]);box('snow',[10,.18,6],[-20,4.6,28]);box('glass',[2.3,2,.1],[-20,2.8,30.6]);
    box('wood',[5,2.5,3],[0,1.8,22]);box('paper',[3.5,.1,1.8],[0,3.1,22]);
    box('red',[6,3,3],[35,2.7,26]);box('roof',[6.8,.5,3.5],[35,4.5,26]);
    for(const x of [33,37])for(const z of [24.3,27.7])put('iron',new THREE.TorusGeometry(1.2,.13,6,14),[x,1.2,z]);
    // Thin exposed paving paths give orientation without extra geometry per tile.
    for(const x of [-15,0,15])box('stone',[1.5,.07,52],[x,.43,3]);
    return finish();
}
function interior() {
    const {put,box,cylinder,finish}=builder();
    box('wood',[36,.6,30],[0,.3,0]);
    for(let x=-17;x<18;x+=2)box('brass',[.025,.03,30],[x,.62,0]);
    box('green',[36,14,.7],[0,7,-15]);box('ochre',[.7,14,30],[-18,7,0]);
    box('ivory',[36,.7,1],[0,14,-14.5]);
    for(const x of [-12,0,12]){
        box('ivory',[7,10,.6],[x,8,-14.5]);box('glass',[6,9,.65],[x,8,-14.1]);
        box('ivory',[.18,9,.7],[x,8,-13.8]);box('ivory',[6,.18,.7],[x,8,-13.8]);
        for(const y of [5.5,10.5])box('ivory',[6,.12,.7],[x,y,-13.8]);
    }
    box('red',[18,.06,16],[0,.65,0]);box('wood',[15,.6,7],[0,3,0]);
    for(const x of [-6,6])for(const z of [-2,2])cylinder('wood',.4,2.7,[x,1.65,z]);
    for(const x of [-5,0,5])for(const z of [-5,5]){
        box('wood',[2.2,.4,2.2],[x,1.7,z]);box('green',[2,2,.3],[x,2.8,z+(z>0?1:-1)]);
        for(const dx of [-.8,.8])for(const dz of [-.8,.8])box('wood',[.18,1.6,.18],[x+dx,.8,z+dz]);
    }
    box('paper',[5,.04,3],[0,3.34,0]);
    for(const x of [-4,-2,2,4])box('paper',[1.2,.05,1.6],[x,3.36,1.5],[0,x*.13,0]);
    for(const x of [-5,5]){cylinder('brass',.22,1.2,[x,3.95,0]);cylinder('paper',.13,.9,[x,4.6,0]);put('brass',new THREE.ConeGeometry(.12,.4,8),[x,5.25,0]);}
    for(const x of [-12,12]){box('wood',[5,4,2.5],[x,2,-11]);for(let n=0;n<8;n++)box(n%2?'red':'green',[.36,1.4,1],[x-1.8+n*.5,3,-9.8]);}
    return finish();
}
function Batches({inside=false,dusk=false}:{inside?:boolean;dusk?:boolean}) {
    const meshes=useMemo(() => inside ? interior() : exterior(), [inside]);
    useEffect(() => () => { meshes.forEach(({ geometry }) => geometry.dispose()); }, [meshes]);
    return <group>{meshes.map(({material,geometry})=><mesh key={material} geometry={geometry} castShadow receiveShadow><meshStandardMaterial color={colors[material]} roughness={material==='glass'?.35:.85} metalness={material==='brass'?.5:0} emissive={material==='paper'&&dusk?'#e6a75b':'#000000'} emissiveIntensity={.35} /></mesh>)}</group>;
}
export function SenateSquare1825({dusk=false}:{dusk?:boolean}) { return <><Batches dusk={dusk}/><Particles count={90} color="#f0f3f6" size={.16}/></>; }
export function Assembly1825(){return <Batches inside dusk/>;}
