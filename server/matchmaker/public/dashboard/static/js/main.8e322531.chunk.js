(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{151:function(e,a,t){e.exports=t(213)},202:function(e,a){},213:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),i=t(9),c=t.n(i),o=t(32),l=t(47),s=t(29),u=t(214),d=t(283),m=t(24),p=t(67),g=t(76),f=t.n(g),v=t(121),b=t.n(v),E=window.location.hostname.startsWith("localhost")?"http://localhost:8888":window.location.host;var h=f.a.create({baseURL:"".concat(E,"/api"),timeout:1e3,headers:{}});var O={ioConnect:function(e){var a=e.onUpdateUsers,t=e.onUpdateServers,n=e.onUpdateVars,r=b()(E,{transports:["websocket"]});r.on("connect",function(){console.log("socket connected")}),r.on("disconnect",function(){console.log("socket disconnect")}),r.on("users",function(e){a(e)}),r.on("servers",function(e){t(e)}),r.on("vars",function(e){n(e)})},requestMatching:function(e){return h.post("/requestMatching",{username:e},{timeout:4e4})},activeDediServer:function(e){return f.a.get("http://".concat(e,"/active"),{timeout:2e3})},blockDediServer:function(e){return f.a.get("http://".concat(e,"/block"),{timeout:2e3})},desireIdleServerCount:function(e){return h.post("/idleServerCount",{number:e})}},j=t(48),C=t(33),y=t(52),w=t(49),x=t(53),S=t(27),k=t(31),N=t(60),I=t(260),P=t(92),U=t(265),A=t(266),q=t(268),D=t(269),M=t(282),L=t(267),R=t(87),B=t.n(R),T=t(89),G=t.n(T),V=t(88),W=t.n(V),z=t(86),_=t.n(z),H=t(281),J=t(263),X=t(264),Z=t(261),F=t(262),K=t(259),Q=t(124),Y=t.n(Q),$=t(122),ee=t(123);var ae=window.location.hostname.startsWith("localhost")?"http://localhost:8080":"".concat(window.location.host,"/public/client"),te=Object(u.a)(function(e){return Object(d.a)({root:{margin:0,padding:e.spacing(2)},closeButton:{position:"absolute",right:e.spacing(1),top:e.spacing(1),color:e.palette.grey[500]},progress:{}})});function ne(e){var a=e.children,t=e.onClose,n=te();return r.a.createElement(K.a,{disableTypography:!0,className:n.root},r.a.createElement(N.a,{variant:"h6"},a),t?r.a.createElement(I.a,{"aria-label":"close",className:n.closeButton,onClick:t},r.a.createElement(Y.a,null)):null)}var re="";function ie(e){te();var a=e.onClose,t=e.open,i=r.a.useState("init"),c=Object(S.a)(i,2),o=c[0],l=c[1],s=r.a.useState(1e3),u=Object(S.a)(s,2),d=u[0],m=u[1],p=r.a.useState(0),g=Object(S.a)(p,2),f=g[0],v=g[1],b=r.a.useState(""),E=Object(S.a)(b,2),h=E[0],j=E[1];if(Object(n.useEffect)(function(){var e=function(e){"closeMe"===e.data&&(console.log("closeMe"),y())};return window.addEventListener("message",e),function(){window.removeEventListener("message",e)}},[]),Object($.a)(function(){v(f+1)},d),console.log({open:t,phase:o,elapsedTime:f,delay:d,serverAddr:h}),t&&"init"===o){var C=function(e){for(var a="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=t.length,r=0;r<e;r++)a+=t.charAt(Math.floor(Math.random()*n));return a}(20);re=C,v(0),m(1e3),l("requested"),console.log("send request"),O.requestMatching("jaeseok").then(function(e){t&&C===re&&(m(null),j(e.data.serverAddr||""),l("responded"))})}function y(){a(),v(0),m(null),j(""),l("init"),re="",console.log("called handleClose")}var w=null;return"init"===o||(w="requested"===o?r.a.createElement("div",{style:{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -50%)"}},r.a.createElement(Z.a,{size:70}),r.a.createElement(N.a,{variant:"h2",color:"primary",align:"center"},f),";"):"responded"===o&&""===h?r.a.createElement(N.a,{variant:"h1",color:"error"},"\ub9e4\uce6d\uc774 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4.",r.a.createElement("br",null),"\ub2e4\uc2dc \uc2dc\ub3c4\ud574 \uc8fc\uc138\uc694."):r.a.createElement(ee.a,{url:"http://".concat(ae,"/?hostname=").concat(h.replace(":","%3A")),width:"600px",height:"800px",frameBorder:0,scrolling:"no"})),r.a.createElement(F.a,{onClose:y,"aria-labelledby":"simple-dialog-title",disableBackdropClick:!0,disableEscapeKeyDown:!0,open:t,maxWidth:"md",fullWidth:!0},r.a.createElement(ne,{id:"simple-dialog-title",onClose:y},"Tic Tac Toe ",h),r.a.createElement(H.a,{width:"100%",height:550,bgcolor:"text.primary",position:"relative"},r.a.createElement("div",{style:{zoom:.6}},r.a.createElement("div",{style:{display:"table",position:"absolute",top:0,left:0,height:"100%",width:"100%"}},r.a.createElement("div",{style:{display:"table-cell",verticalAlign:"middle"}},r.a.createElement("div",{style:{marginLeft:"auto",marginRight:"auto",width:"100%"}},r.a.createElement(J.a,{container:!0,justify:"center",alignItems:"center"},w)))))))}var ce=function(){var e=r.a.useState(!1),a=Object(S.a)(e,2),t=a[0],n=a[1];return r.a.createElement("div",null,r.a.createElement(X.a,{variant:"outlined",color:"primary",onClick:function(){n(!0)}},"Start Game"),r.a.createElement(ie,{open:t,onClose:function(){n(!1)}}))},oe=Object(u.a)(function(e){return Object(d.a)({root:{flexShrink:0,color:e.palette.text.secondary,marginLeft:e.spacing(2.5)}})});function le(e){var a=oe(),t=Object(k.a)(),n=e.count,i=e.page,c=e.rowsPerPage,o=e.onChangePage;return r.a.createElement("div",{className:a.root},r.a.createElement(I.a,{onClick:function(e){o(e,0)},disabled:0===i,"aria-label":"first page"},"rtl"===t.direction?r.a.createElement(_.a,null):r.a.createElement(B.a,null)),r.a.createElement(I.a,{onClick:function(e){o(e,i-1)},disabled:0===i,"aria-label":"previous page"},"rtl"===t.direction?r.a.createElement(W.a,null):r.a.createElement(G.a,null)),r.a.createElement(I.a,{onClick:function(e){o(e,i+1)},disabled:i>=Math.ceil(n/c)-1,"aria-label":"next page"},"rtl"===t.direction?r.a.createElement(G.a,null):r.a.createElement(W.a,null)),r.a.createElement(I.a,{onClick:function(e){o(e,Math.max(0,Math.ceil(n/c)-1))},disabled:i>=Math.ceil(n/c)-1,"aria-label":"last page"},"rtl"===t.direction?r.a.createElement(B.a,null):r.a.createElement(_.a,null)))}var se=Object(u.a)(function(e){return Object(d.a)({toolbar:Object(s.a)({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:"0 8px"},e.mixins.toolbar),content:{flexGrow:1,padding:e.spacing(3)},margin:{margin:e.spacing(2)},accountPaper:{padding:e.spacing(3,2)},tablePaper:{width:"100%",marginTop:e.spacing(3)},table:{minWidth:500},tableWrapper:{overflowX:"auto"}})});var ue=function(e){var a=se(),t=r.a.useState(0),n=Object(S.a)(t,2),i=n[0],c=n[1],o=r.a.useState(5),l=Object(S.a)(o,2),s=l[0],u=l[1],d=e.user.sort(function(e,a){return a.score-e.score}),m=s-Math.min(s,d.length-i*s);return r.a.createElement("main",{className:a.content},r.a.createElement("div",{className:a.toolbar}),r.a.createElement(P.a,{className:a.accountPaper},r.a.createElement(N.a,{variant:"h5",component:"h3"},"\uc720\uc800 \uc815\ubcf4"),r.a.createElement(N.a,{component:"p"},"ID: ","jaeseok"),r.a.createElement(N.a,{component:"p"},"Score: ",1234),r.a.createElement(ce,null)),r.a.createElement(P.a,{className:a.tablePaper},r.a.createElement("div",{className:a.tableWrapper},r.a.createElement(U.a,{className:a.table},r.a.createElement(A.a,null,d.slice(i*s,i*s+s).map(function(e){return r.a.createElement(L.a,{key:e.username},r.a.createElement(q.a,{component:"th",scope:"row"},e.username),r.a.createElement(q.a,{align:"center"},e.score))}),m>0&&r.a.createElement(L.a,{style:{height:48*m}},r.a.createElement(q.a,{colSpan:6}))),r.a.createElement(D.a,null,r.a.createElement(L.a,null,r.a.createElement(M.a,{rowsPerPageOptions:[5,10,25],colSpan:3,count:d.length,rowsPerPage:s,page:i,SelectProps:{inputProps:{"aria-label":"rows per page"},native:!0},onChangePage:function(e,a){c(a)},onChangeRowsPerPage:function(e){u(parseInt(e.target.value,10)),c(0)},ActionsComponent:le})))))))},de=function(e){function a(){return Object(j.a)(this,a),Object(y.a)(this,Object(w.a)(a).apply(this,arguments))}return Object(x.a)(a,e),Object(C.a)(a,[{key:"render",value:function(){var e=this.props.users;return r.a.createElement(ue,{user:e})}}]),a}(r.a.Component),me=Object(o.b)(function(e){return{users:e.users}})(de),pe=t(35),ge=t(270),fe=t(277),ve=t(274),be=t(273),Ee=t(275),he=t(284),Oe=t(272),je=t(216),Ce=t(276),ye=t(278),we=t(138),xe=t(271),Se=t(130),ke=t.n(Se),Ne=t(132),Ie=t.n(Ne),Pe=t(131),Ue=t.n(Pe),Ae=t(135),qe=t.n(Ae),De=t(129),Me=t.n(De),Le=t(134),Re=t.n(Le),Be=t(133),Te=t.n(Be),Ge=t(3),Ve=Object(u.a)(function(e){return Object(d.a)({root:{display:"flex"},appBar:{zIndex:e.zIndex.drawer+1,transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarShift:{marginLeft:240,width:"calc(100% - ".concat(240,"px)"),transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1},hide:{display:"none"},drawer:{width:240,flexShrink:0,whiteSpace:"nowrap"},drawerOpen:{width:240,transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},drawerClose:Object(pe.a)({transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),overflowX:"hidden",width:e.spacing(7)+1},e.breakpoints.up("sm"),{width:e.spacing(9)+1}),toolbar:Object(s.a)({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:"0 8px"},e.mixins.toolbar),content:{flexGrow:1,padding:e.spacing(3)},margin:{margin:e.spacing(2)}})}),We=Object(m.f)(function(e){var a,t,n=Ve(),i=Object(k.a)(),c=r.a.useState(!0),o=Object(S.a)(c,2),l=o[0],s=o[1],u=r.a.useState(null),d=Object(S.a)(u,2),m=d[0],p=d[1],g=Boolean(m),f=e.history,v=e.auth,b=e.userCount,E=e.serverCount;function h(){p(null)}return r.a.createElement("div",null,r.a.createElement(be.a,null),r.a.createElement(ve.a,{position:"fixed",className:Object(Ge.a)(n.appBar,Object(pe.a)({},n.appBarShift,l))},r.a.createElement(xe.a,null,r.a.createElement(I.a,{color:"inherit","aria-label":"open drawer",onClick:function(){s(!0)},edge:"start",className:Object(Ge.a)(n.menuButton,Object(pe.a)({},n.hide,l))},r.a.createElement(Me.a,null)),r.a.createElement(N.a,{variant:"h6",noWrap:!0,className:n.title},"HoL \ud1b5\ud569 \ud074\ub77c\uc774\uc5b8\ud2b8"),v&&r.a.createElement("div",null,r.a.createElement(I.a,{"aria-label":"account of current user","aria-controls":"menu-appbar","aria-haspopup":"true",onClick:function(e){p(e.currentTarget)},color:"inherit"},r.a.createElement(ke.a,null)),r.a.createElement(we.a,{id:"menu-appbar",anchorEl:m,anchorOrigin:{vertical:"top",horizontal:"right"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"right"},open:g,onClose:h},r.a.createElement(ge.a,{onClick:h},"Profile"),r.a.createElement(ge.a,{onClick:h},"My account"))))),r.a.createElement(he.a,{variant:"permanent",className:Object(Ge.a)(n.drawer,(a={},Object(pe.a)(a,n.drawerOpen,l),Object(pe.a)(a,n.drawerClose,!l),a)),classes:{paper:Object(Ge.a)((t={},Object(pe.a)(t,n.drawerOpen,l),Object(pe.a)(t,n.drawerClose,!l),t))},open:l},r.a.createElement("div",{className:n.toolbar},r.a.createElement(I.a,{onClick:function(){s(!1)}},"rtl"===i.direction?r.a.createElement(Ue.a,null):r.a.createElement(Ie.a,null))),r.a.createElement(Ee.a,null),r.a.createElement(Oe.a,null,r.a.createElement(je.a,{button:!0,key:"Games",onClick:function(){return f.push("/game")}},r.a.createElement(Ce.a,null,r.a.createElement(fe.a,{className:n.margin,showZero:!0,badgeContent:b,max:99,color:"primary"},r.a.createElement(Te.a,null))),r.a.createElement(ye.a,{primary:"\uac8c\uc784"})),r.a.createElement(je.a,{button:!0,key:"TrendingUp",onClick:function(){return f.push("/server")}},r.a.createElement(Ce.a,null,r.a.createElement(fe.a,{className:n.margin,showZero:!0,badgeContent:E,max:99,color:"primary"},r.a.createElement(Re.a,null))),r.a.createElement(ye.a,{primary:"\ubaa8\ub2c8\ud130\ub9c1"})),r.a.createElement(je.a,{button:!0,key:"Grade",onClick:function(){return f.push("/leaderboard")}},r.a.createElement(Ce.a,null,r.a.createElement(fe.a,{className:n.margin,color:"primary"},r.a.createElement(qe.a,null))),r.a.createElement(ye.a,{primary:"\ub9ac\ub354\ubcf4\ub4dc"})))))}),ze=function(e){function a(){return Object(j.a)(this,a),Object(y.a)(this,Object(w.a)(a).apply(this,arguments))}return Object(x.a)(a,e),Object(C.a)(a,[{key:"render",value:function(){var e=this.props,a=e.auth,t=e.userCount,n=e.serverCount;return r.a.createElement(We,{auth:a,userCount:t,serverCount:n})}}]),a}(r.a.Component),_e=Object(o.b)(function(e){return{auth:e.data,userCount:e.users.length,serverCount:e.servers.length}})(ze),He=t(285),Je=t(279),Xe=t(280),Ze=t(137),Fe=t.n(Ze),Ke=t(136),Qe=t.n(Ke),Ye=t(220),$e=Object(u.a)(function(e){return Object(d.a)({paper:{padding:e.spacing(1),textAlign:"center",color:e.palette.text.secondary},card:{display:"flex"},details:{display:"flex",flexDirection:"column"},content:{flex:"1 0 auto"},controls:{display:"flex",alignItems:"center",paddingLeft:e.spacing(1)},icon:{height:20,width:20}})});function ea(e){var a=e.server,t=e.control,n=$e();Object(Ye.a)();return r.a.createElement(J.a,{item:!0,xs:3},r.a.createElement(Je.a,{className:n.card},r.a.createElement("div",{className:n.details},r.a.createElement(Xe.a,{className:n.content},r.a.createElement(N.a,{component:"h5",variant:"h5"},a.addr),r.a.createElement(N.a,{variant:"subtitle2",color:"textSecondary"},a.definition),r.a.createElement(N.a,{variant:"subtitle2",color:"textSecondary"},a.state)),t&&r.a.createElement("div",{className:n.controls},r.a.createElement(I.a,{"aria-label":"play",onClick:function(){O.activeDediServer(a.addr).then(function(e){console.log(e)})}},r.a.createElement(Qe.a,{className:n.icon})),r.a.createElement(I.a,{"aria-label":"block",onClick:function(){O.blockDediServer(a.addr).then(function(e){console.log(e)})}},r.a.createElement(Fe.a,{className:n.icon}))))))}var aa=Object(u.a)(function(e){return Object(d.a)({root:{flexGrow:1},paper:{padding:e.spacing(1),textAlign:"center",color:e.palette.text.secondary}})});function ta(e){var a=e.name,t=e.servers,n=aa();return r.a.createElement("div",{className:n.root},r.a.createElement(N.a,{paragraph:!0},a,"(",t.length,")"),r.a.createElement(J.a,{container:!0,spacing:1},r.a.createElement(J.a,{container:!0,item:!0,xs:12,spacing:2},t.map(function(e){return r.a.createElement(ea,{key:e.addr,server:e,control:"Idle"===a})}))))}var na=Object(u.a)(function(e){return Object(d.a)({slider:{width:300,margin:e.spacing(1)},toolbar:Object(s.a)({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:"0 8px"},e.mixins.toolbar),content:{flexGrow:1,padding:e.spacing(3)},margin:{margin:e.spacing(1)}})});function ra(e){var a=e.servers,t=e.idleServerCount,n=na(),i=a.filter(function(e){return"ready"===e.state||"bind"===e.state}),c=a.filter(function(e){return"busy"===e.state});return r.a.createElement("main",{className:n.content},r.a.createElement("div",{className:n.toolbar}),r.a.createElement("div",{className:n.slider},r.a.createElement(N.a,{id:"discrete-slider",gutterBottom:!0},"\ub300\uae30 \uc11c\ubc84 \uac1c\uc218 \uc124\uc815"),r.a.createElement(He.a,{defaultValue:t,getAriaValueText:function(e){return e.toString()},"aria-labelledby":"discrete-slider",valueLabelDisplay:"auto",step:5,marks:!0,min:5,max:50,value:t,onChangeCommitted:function(e,a){console.log(a),O.desireIdleServerCount(a)}})),r.a.createElement("div",{className:n.margin},r.a.createElement(ta,{key:"active",name:"Active",servers:c})),r.a.createElement("div",{className:n.margin},r.a.createElement(ta,{key:"idle",name:"Idle",servers:i})))}var ia=function(e){function a(){return Object(j.a)(this,a),Object(y.a)(this,Object(w.a)(a).apply(this,arguments))}return Object(x.a)(a,e),Object(C.a)(a,[{key:"render",value:function(){var e=this.props,a=e.servers,t=e.idleServerCount;return r.a.createElement(ra,{servers:a,idleServerCount:t})}}]),a}(r.a.Component),ca=Object(o.b)(function(e){return{servers:e.servers,idleServerCount:e.data.desireIdleSrvCnt}})(ia),oa=Object(u.a)(function(e){return Object(d.a)({toolbar:Object(s.a)({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:"0 8px"},e.mixins.toolbar),content:{flexGrow:1,padding:e.spacing(3)},margin:{margin:e.spacing(2)}})}),la=Object(m.f)(function(){var e=oa();return r.a.createElement("main",{className:e.content},r.a.createElement("div",{className:e.toolbar}),r.a.createElement(N.a,{paragraph:!0},"Leaderboard Page"),r.a.createElement(N.a,{paragraph:!0},"Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a."))}),sa={username:"jaeseok",desireIdleSrvCnt:10};var ua=t(51),da=[];var ma=[];var pa=Object(u.a)(function(e){return Object(d.a)({root:{display:"flex"},toolbar:Object(s.a)({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:"0 8px"},e.mixins.toolbar),content:{flexGrow:1,padding:e.spacing(3)},margin:{margin:e.spacing(2)}})});var ga=Object(o.b)(void 0,function(e){return{onUpdateUsers:function(a){e(function(e){return{type:"users/REPLACE",users:e}}(a))},onUpdateServers:function(a){e(function(e){return{type:"server/REPLACE",servers:e}}(a))},onUpdateVars:function(a){e({type:"data/DESIRE_IDLE_SRV_CNT",desireIdleSrvCnt:a.idleServerNumber})}}})(function(e){var a=pa();return Object(n.useEffect)(function(){O.ioConnect({onUpdateUsers:e.onUpdateUsers,onUpdateServers:e.onUpdateServers,onUpdateVars:e.onUpdateVars})}),r.a.createElement("div",{className:a.root},r.a.createElement(p.a,{basename:"/dashboard"},r.a.createElement(_e,null),r.a.createElement(m.a,{from:"/",to:"/server"}),r.a.createElement(m.b,{path:"/game",component:me}),r.a.createElement(m.b,{path:"/server",component:ca}),r.a.createElement(m.b,{path:"/leaderboard",component:la})))}),fa=Object(l.b)({data:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:sa,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"data/AUTH":return{username:a.username,desireIdleSrvCnt:e.desireIdleSrvCnt};case"data/DESIRE_IDLE_SRV_CNT":return{username:e.username,desireIdleSrvCnt:a.desireIdleSrvCnt};default:return e}},users:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ma,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"users/REPLACE":return a.users;case"user/ADD":return e.find(function(e){return e.username===a.username})?e:[].concat(Object(ua.a)(e),[{username:a.username,score:a.score}]);case"user/REMOVE":return e.filter(function(e){return e.username!==a.username});default:return e}},servers:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:da,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"server/REPLACE":return a.servers;case"server/ADD":return e.find(function(e){return e.addr===a.addr})?e:[].concat(Object(ua.a)(e),[{addr:a.addr,definition:a.definition,state:a.state}]);case"server/UPDATE":var t=e.find(function(e){return e.addr===a.addr});return e.filter(function(e){return e.addr!==a.addr}).concat([{addr:t.addr,definition:t.definition,state:a.state}]);case"server/REMOVE":return e.filter(function(e){return e.addr!==a.addr});default:return e}}}),va=Object(l.c)(fa);c.a.render(r.a.createElement(o.a,{store:va},r.a.createElement(ga,null),","),document.getElementById("root"))}},[[151,1,2]]]);
//# sourceMappingURL=main.8e322531.chunk.js.map