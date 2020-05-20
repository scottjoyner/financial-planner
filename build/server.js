require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "updates/" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "updates/" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "12ca07e53401d2215351";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded chunks
/******/ 	// "0" means "already loaded"
/******/ 	var installedChunks = {
/******/ 		"server": 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// require() chunk loading for javascript
/******/
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] !== 0) {
/******/ 			var chunk = require("./chunks/" + ({"vendors~about~admin~contact~home~login~not-found~privacy~register":"vendors~about~admin~contact~home~login~not-found~privacy~register","about~admin~contact~home~login~not-found~privacy~register":"about~admin~contact~home~login~not-found~privacy~register","about":"about","admin":"admin","contact":"contact","home":"home","login":"login","not-found":"not-found","privacy":"privacy","register":"register"}[chunkId]||chunkId) + ".js");
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids;
/******/ 			for(var moduleId in moreModules) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// uncaught error handler for webpack runtime
/******/ 	__webpack_require__.oe = function(err) {
/******/ 		process.nextTick(function() {
/******/ 			throw err; // catch this error by using import().catch()
/******/ 		});
/******/ 	};
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./chunk-manifest.json":
/***/ (function(module, exports) {

module.exports = require("./chunk-manifest.json");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/routes/error/ErrorPage.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\nhtml {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n  -ms-flex-pack: center;\n      justify-content: center;\n  padding: 0 32px;\n  padding: 0 2rem;\n  height: 100%;\n  font-family: sans-serif;\n  text-align: center;\n  color: #888;\n}\n\nbody {\n  margin: 0;\n}\n\nh1 {\n  font-weight: 400;\n  color: #555;\n}\n\npre {\n  white-space: pre-wrap;\n  text-align: left;\n}\n", "",{"version":3,"sources":["ErrorPage.css"],"names":[],"mappings":"AAAA;;;;;;;EAOE;;AAEF;EACE,oBAAa;EAAb,aAAa;EACb,sBAAmB;MAAnB,mBAAmB;EACnB,qBAAuB;MAAvB,uBAAuB;EACvB,eAAe;EAAf,eAAe;EACf,YAAY;EACZ,uBAAuB;EACvB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE,SAAS;AACX;;AAEA;EACE,gBAAgB;EAChB,WAAW;AACb;;AAEA;EACE,qBAAqB;EACrB,gBAAgB;AAClB","file":"ErrorPage.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\nhtml {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0 2rem;\n  height: 100%;\n  font-family: sans-serif;\n  text-align: center;\n  color: #888;\n}\n\nbody {\n  margin: 0;\n}\n\nh1 {\n  font-weight: 400;\n  color: #555;\n}\n\npre {\n  white-space: pre-wrap;\n  text-align: left;\n}\n"]}]);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], "{").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      // eslint-disable-next-line prefer-destructuring
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = modules[_i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = "(".concat(item[2], ") and (").concat(mediaQuery, ")");
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot).concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "./node_modules/isomorphic-style-loader/insertCss.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! Isomorphic Style Loader | MIT License | https://github.com/kriasoft/isomorphic-style-loader */



var inserted = {};

function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode("0x" + p1);
  }));
}

function removeCss(ids) {
  ids.forEach(function (id) {
    if (--inserted[id] <= 0) {
      var elem = document.getElementById(id);

      if (elem) {
        elem.parentNode.removeChild(elem);
      }
    }
  });
}

function insertCss(styles, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$replace = _ref.replace,
      replace = _ref$replace === void 0 ? false : _ref$replace,
      _ref$prepend = _ref.prepend,
      prepend = _ref$prepend === void 0 ? false : _ref$prepend,
      _ref$prefix = _ref.prefix,
      prefix = _ref$prefix === void 0 ? 's' : _ref$prefix;

  var ids = [];

  for (var i = 0; i < styles.length; i++) {
    var _styles$i = styles[i],
        moduleId = _styles$i[0],
        css = _styles$i[1],
        media = _styles$i[2],
        sourceMap = _styles$i[3];
    var id = "" + prefix + moduleId + "-" + i;
    ids.push(id);

    if (inserted[id]) {
      if (!replace) {
        inserted[id]++;
        continue;
      }
    }

    inserted[id] = 1;
    var elem = document.getElementById(id);
    var create = false;

    if (!elem) {
      create = true;
      elem = document.createElement('style');
      elem.setAttribute('type', 'text/css');
      elem.id = id;

      if (media) {
        elem.setAttribute('media', media);
      }
    }

    var cssText = css;

    if (sourceMap && typeof btoa === 'function') {
      cssText += "\n/*# sourceMappingURL=data:application/json;base64," + b64EncodeUnicode(JSON.stringify(sourceMap)) + "*/";
      cssText += "\n/*# sourceURL=" + sourceMap.file + "?" + id + "*/";
    }

    if ('textContent' in elem) {
      elem.textContent = cssText;
    } else {
      elem.styleSheet.cssText = cssText;
    }

    if (create) {
      if (prepend) {
        document.head.insertBefore(elem, document.head.childNodes[0]);
      } else {
        document.head.appendChild(elem);
      }
    }
  }

  return removeCss.bind(null, ids);
}

module.exports = insertCss;
//# sourceMappingURL=insertCss.js.map


/***/ }),

/***/ "./src/components/App.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return App; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var isomorphic_style_loader_StyleContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("isomorphic-style-loader/StyleContext");
/* harmony import */ var isomorphic_style_loader_StyleContext__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(isomorphic_style_loader_StyleContext__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ApplicationContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/components/ApplicationContext.js");
var _jsxFileName = "/Users/scottjoyner/git/financial-planner/src/components/App.js";

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




/**
 * The top-level React component setting context (global) variables
 * that can be accessed from all the child components.
 *
 * https://facebook.github.io/react/docs/context.html
 *
 * Usage example:
 *
 *   const context = {
 *     history: createBrowserHistory(),
 *     store: createStore(),
 *   };
 *
 *   ReactDOM.render(
 *     <App context={context} insertCss={() => {}}>
 *       <Layout>
 *         <LandingPage />
 *       </Layout>
 *     </App>,
 *     container,
 *   );
 */

function App({
  context,
  insertCss,
  children
}) {
  // NOTE: If you need to add or modify header, footer etc. of the app,
  // please do that inside the Layout component.
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(isomorphic_style_loader_StyleContext__WEBPACK_IMPORTED_MODULE_2___default.a.Provider, {
    value: {
      insertCss
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 43
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ApplicationContext__WEBPACK_IMPORTED_MODULE_3__["default"].Provider, {
    value: {
      context
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 44
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.Children.only(children)));
}
App.propTypes = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  context: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    // Universal HTTP client
    fetch: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
    pathname: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
    query: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object
  }).isRequired,
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.element.isRequired
};

/***/ }),

/***/ "./src/components/ApplicationContext.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const ApplicationContext = react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext({
  fetch: () => {
    throw new Error('Fetch method not initialized.');
  }
});
/* harmony default export */ __webpack_exports__["default"] = (ApplicationContext);

/***/ }),

/***/ "./src/components/Html.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Html; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var serialize_javascript__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("serialize-javascript");
/* harmony import */ var serialize_javascript__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(serialize_javascript__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/config.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/Users/scottjoyner/git/financial-planner/src/components/Html.js";

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




/* eslint-disable react/no-danger */

function Html({
  title,
  description,
  styles,
  scripts,
  app,
  children
}) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("html", {
    className: "no-js",
    lang: "en",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("head", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", {
    charSet: "utf-8",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", {
    httpEquiv: "x-ua-compatible",
    content: "ie=edge",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("title", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: this
  }, title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", {
    name: "description",
    content: description,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    },
    __self: this
  }), scripts.map(script => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("link", {
    key: script,
    rel: "preload",
    href: script,
    as: "script",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34
    },
    __self: this
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("link", {
    rel: "manifest",
    href: "/site.webmanifest",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("link", {
    rel: "apple-touch-icon",
    href: "/icon.png",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    },
    __self: this
  }), styles.map(style => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("style", {
    key: style.id,
    id: style.id,
    dangerouslySetInnerHTML: {
      __html: style.cssText
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    },
    __self: this
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("body", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "app",
    dangerouslySetInnerHTML: {
      __html: children
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("script", {
    dangerouslySetInnerHTML: {
      __html: `window.App=${serialize_javascript__WEBPACK_IMPORTED_MODULE_2___default()(app)}`
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48
    },
    __self: this
  }), scripts.map(script => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("script", {
    key: script,
    src: script,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    },
    __self: this
  })), _config__WEBPACK_IMPORTED_MODULE_3___default.a.analytics.googleTrackingId && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("script", {
    dangerouslySetInnerHTML: {
      __html: 'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' + `ga('create','${_config__WEBPACK_IMPORTED_MODULE_3___default.a.analytics.googleTrackingId}','auto');ga('send','pageview')`
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    },
    __self: this
  }), _config__WEBPACK_IMPORTED_MODULE_3___default.a.analytics.googleTrackingId && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("script", {
    src: "https://www.google-analytics.com/analytics.js",
    async: true,
    defer: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64
    },
    __self: this
  })));
}
Html.propTypes = {
  title: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  description: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  styles: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
    cssText: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired
  }).isRequired),
  scripts: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired),
  app: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  // eslint-disable-line
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired
};
Html.defaultProps = {
  styles: [],
  scripts: []
};

/***/ }),

/***/ "./src/config.js":
/***/ (function(module, exports, __webpack_require__) {

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable max-len */
if (false) {}

module.exports = {
  // Node.js app
  port: process.env.PORT || 3000,
  // https://expressjs.com/en/guide/behind-proxies.html
  trustProxy: process.env.TRUST_PROXY || 'loopback',
  // API Gateway
  api: {
    // API URL to be used in the client-side code
    clientUrl: process.env.API_CLIENT_URL || '',
    // API URL to be used in the server-side code
    serverUrl: process.env.API_SERVER_URL || `http://localhost:${process.env.PORT || 3000}`
  },
  // Database
  databaseUrl: process.env.DATABASE_URL || 'sqlite:database.sqlite',
  // Web analytics
  analytics: {
    // https://analytics.google.com/
    googleTrackingId: process.env.GOOGLE_TRACKING_ID // UA-XXXXX-X

  },
  // Authentication
  auth: {
    jwt: {
      secret: process.env.JWT_SECRET || 'React Starter Kit'
    },
    // https://developers.facebook.com/
    facebook: {
      id: process.env.FACEBOOK_APP_ID || '186244551745631',
      secret: process.env.FACEBOOK_APP_SECRET || 'a970ae3240ab4b9b8aae0f9f0661c6fc'
    },
    // https://cloud.google.com/console/project
    google: {
      id: process.env.GOOGLE_CLIENT_ID || '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
      secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd'
    },
    // https://apps.twitter.com/
    twitter: {
      key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
      secret: process.env.TWITTER_CONSUMER_SECRET || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ'
    }
  }
};

/***/ }),

/***/ "./src/createFetch.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Creates a wrapper function around the HTML5 Fetch API that provides
 * default arguments to fetch(...) and is intended to reduce the amount
 * of boilerplate code in the application.
 * https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch
 */
function createFetch(fetch, {
  baseUrl,
  cookie,
  schema,
  graphql
}) {
  // NOTE: Tweak the default options to suite your application needs
  const defaults = {
    method: 'POST',
    // handy with GraphQL backends
    mode: baseUrl ? 'cors' : 'same-origin',
    credentials: baseUrl ? 'include' : 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(cookie ? {
        Cookie: cookie
      } : null)
    }
  };
  return async (url, options) => {
    const isGraphQL = url.startsWith('/graphql');

    if (schema && graphql && isGraphQL) {
      // We're SSR, so route the graphql internal to avoid latency
      const query = JSON.parse(options.body);
      const result = await graphql(schema, query.query, {
        request: {}
      }, // fill in request vars needed by graphql
      null, query.variables);
      return Promise.resolve({
        status: result.errors ? 400 : 200,
        json: () => Promise.resolve(result)
      });
    }

    return isGraphQL || url.startsWith('/api') ? fetch(`${baseUrl}${url}`, { ...defaults,
      ...options,
      headers: { ...defaults.headers,
        ...(options && options.headers)
      }
    }) : fetch(url, options);
  };
}

/* harmony default export */ __webpack_exports__["default"] = (createFetch);

/***/ }),

/***/ "./src/data/models/User.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("sequelize");
/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sequelize__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _sequelize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/data/sequelize.js");
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */


const User = _sequelize__WEBPACK_IMPORTED_MODULE_1__["default"].define('User', {
  id: {
    type: sequelize__WEBPACK_IMPORTED_MODULE_0___default.a.UUID,
    defaultValue: sequelize__WEBPACK_IMPORTED_MODULE_0___default.a.UUIDV1,
    primaryKey: true
  },
  email: {
    type: sequelize__WEBPACK_IMPORTED_MODULE_0___default.a.STRING(255),
    validate: {
      isEmail: true
    }
  },
  emailConfirmed: {
    type: sequelize__WEBPACK_IMPORTED_MODULE_0___default.a.BOOLEAN,
    defaultValue: false
  }
}, {
  indexes: [{
    fields: ['email']
  }]
});
/* harmony default export */ __webpack_exports__["default"] = (User);

/***/ }),

/***/ "./src/data/models/UserClaim.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("sequelize");
/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sequelize__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _sequelize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/data/sequelize.js");
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */


const UserClaim = _sequelize__WEBPACK_IMPORTED_MODULE_1__["default"].define('UserClaim', {
  type: {
    type: sequelize__WEBPACK_IMPORTED_MODULE_0___default.a.STRING
  },
  value: {
    type: sequelize__WEBPACK_IMPORTED_MODULE_0___default.a.STRING
  }
});
/* harmony default export */ __webpack_exports__["default"] = (UserClaim);

/***/ }),

/***/ "./src/data/models/UserLogin.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("sequelize");
/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sequelize__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _sequelize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/data/sequelize.js");
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */


const UserLogin = _sequelize__WEBPACK_IMPORTED_MODULE_1__["default"].define('UserLogin', {
  name: {
    type: sequelize__WEBPACK_IMPORTED_MODULE_0___default.a.STRING(50),
    primaryKey: true
  },
  key: {
    type: sequelize__WEBPACK_IMPORTED_MODULE_0___default.a.STRING(100),
    primaryKey: true
  }
});
/* harmony default export */ __webpack_exports__["default"] = (UserLogin);

/***/ }),

/***/ "./src/data/models/UserProfile.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("sequelize");
/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sequelize__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _sequelize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/data/sequelize.js");
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */


const UserProfile = _sequelize__WEBPACK_IMPORTED_MODULE_1__["default"].define('UserProfile', {
  userId: {
    type: sequelize__WEBPACK_IMPORTED_MODULE_0___default.a.UUID,
    primaryKey: true
  },
  displayName: {
    type: sequelize__WEBPACK_IMPORTED_MODULE_0___default.a.STRING(100)
  },
  picture: {
    type: sequelize__WEBPACK_IMPORTED_MODULE_0___default.a.STRING(255)
  },
  gender: {
    type: sequelize__WEBPACK_IMPORTED_MODULE_0___default.a.STRING(50)
  },
  location: {
    type: sequelize__WEBPACK_IMPORTED_MODULE_0___default.a.STRING(100)
  },
  website: {
    type: sequelize__WEBPACK_IMPORTED_MODULE_0___default.a.STRING(255)
  }
});
/* harmony default export */ __webpack_exports__["default"] = (UserProfile);

/***/ }),

/***/ "./src/data/models/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sequelize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/data/sequelize.js");
/* harmony import */ var _User__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/data/models/User.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "User", function() { return _User__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _UserLogin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/data/models/UserLogin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UserLogin", function() { return _UserLogin__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _UserClaim__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/data/models/UserClaim.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UserClaim", function() { return _UserClaim__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _UserProfile__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/data/models/UserProfile.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UserProfile", function() { return _UserProfile__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





_User__WEBPACK_IMPORTED_MODULE_1__["default"].hasMany(_UserLogin__WEBPACK_IMPORTED_MODULE_2__["default"], {
  foreignKey: 'userId',
  as: 'logins',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});
_User__WEBPACK_IMPORTED_MODULE_1__["default"].hasMany(_UserClaim__WEBPACK_IMPORTED_MODULE_3__["default"], {
  foreignKey: 'userId',
  as: 'claims',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});
_User__WEBPACK_IMPORTED_MODULE_1__["default"].hasOne(_UserProfile__WEBPACK_IMPORTED_MODULE_4__["default"], {
  foreignKey: 'userId',
  as: 'profile',
  onUpdate: 'cascade',
  onDelete: 'cascade'
});

function sync(...args) {
  return _sequelize__WEBPACK_IMPORTED_MODULE_0__["default"].sync(...args);
}

/* harmony default export */ __webpack_exports__["default"] = ({
  sync
});


/***/ }),

/***/ "./src/data/queries/me.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _types_UserType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/data/types/UserType.js");
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const me = {
  type: _types_UserType__WEBPACK_IMPORTED_MODULE_0__["default"],

  resolve({
    request
  }) {
    return request.user && {
      id: request.user.id,
      email: request.user.email
    };
  }

};
/* harmony default export */ __webpack_exports__["default"] = (me);

/***/ }),

/***/ "./src/data/queries/news.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("graphql");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("node-fetch");
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_fetch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _types_NewsItemType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/data/types/NewsItemType.js");
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */


 // React.js News Feed (RSS)

const url = 'https://api.rss2json.com/v1/api.json' + '?rss_url=https%3A%2F%2Freactjsnews.com%2Ffeed.xml';
let items = [];
let lastFetchTask;
let lastFetchTime = new Date(1970, 0, 1);
const news = {
  type: new graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLList"](_types_NewsItemType__WEBPACK_IMPORTED_MODULE_2__["default"]),

  resolve() {
    if (lastFetchTask) {
      return lastFetchTask;
    }

    if (new Date() - lastFetchTime > 1000 * 60 * 10
    /* 10 mins */
    ) {
        lastFetchTime = new Date();
        lastFetchTask = node_fetch__WEBPACK_IMPORTED_MODULE_1___default()(url).then(response => response.json()).then(data => {
          if (data.status === 'ok') {
            items = data.items;
          }

          lastFetchTask = null;
          return items;
        }).catch(err => {
          lastFetchTask = null;
          throw err;
        });

        if (items.length) {
          return items;
        }

        return lastFetchTask;
      }

    return items;
  }

};
/* harmony default export */ __webpack_exports__["default"] = (news);

/***/ }),

/***/ "./src/data/schema.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("graphql");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _queries_me__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/data/queries/me.js");
/* harmony import */ var _queries_news__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/data/queries/news.js");
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */



const schema = new graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLSchema"]({
  query: new graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLObjectType"]({
    name: 'Query',
    fields: {
      me: _queries_me__WEBPACK_IMPORTED_MODULE_1__["default"],
      news: _queries_news__WEBPACK_IMPORTED_MODULE_2__["default"]
    }
  })
});
/* harmony default export */ __webpack_exports__["default"] = (schema);

/***/ }),

/***/ "./src/data/sequelize.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("sequelize");
/* harmony import */ var sequelize__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sequelize__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/config.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_1__);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */


const sequelize = new sequelize__WEBPACK_IMPORTED_MODULE_0___default.a(_config__WEBPACK_IMPORTED_MODULE_1___default.a.databaseUrl, {
  operatorsAliases: sequelize__WEBPACK_IMPORTED_MODULE_0__["Op"],
  define: {
    freezeTableName: true
  }
});
/* harmony default export */ __webpack_exports__["default"] = (sequelize);

/***/ }),

/***/ "./src/data/types/NewsItemType.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("graphql");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql__WEBPACK_IMPORTED_MODULE_0__);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const NewsItemType = new graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLObjectType"]({
  name: 'NewsItem',
  fields: {
    title: {
      type: new graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLNonNull"](graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"])
    },
    link: {
      type: new graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLNonNull"](graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"])
    },
    author: {
      type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"]
    },
    pubDate: {
      type: new graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLNonNull"](graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"])
    },
    content: {
      type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"]
    }
  }
});
/* harmony default export */ __webpack_exports__["default"] = (NewsItemType);

/***/ }),

/***/ "./src/data/types/UserType.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("graphql");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(graphql__WEBPACK_IMPORTED_MODULE_0__);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const UserType = new graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLObjectType"]({
  name: 'User',
  fields: {
    id: {
      type: new graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLNonNull"](graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLID"])
    },
    email: {
      type: graphql__WEBPACK_IMPORTED_MODULE_0__["GraphQLString"]
    }
  }
});
/* harmony default export */ __webpack_exports__["default"] = (UserType);

/***/ }),

/***/ "./src/passport.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("passport");
/* harmony import */ var passport__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(passport__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var passport_facebook__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("passport-facebook");
/* harmony import */ var passport_facebook__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(passport_facebook__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _data_models__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/data/models/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/config.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_3__);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/**
 * Passport.js reference implementation.
 * The database schema used in this sample is available at
 * https://github.com/membership/membership.db/tree/master/postgres
 */




/**
 * Sign in with Facebook.
 */

passport__WEBPACK_IMPORTED_MODULE_0___default.a.use(new passport_facebook__WEBPACK_IMPORTED_MODULE_1__["Strategy"]({
  clientID: _config__WEBPACK_IMPORTED_MODULE_3___default.a.auth.facebook.id,
  clientSecret: _config__WEBPACK_IMPORTED_MODULE_3___default.a.auth.facebook.secret,
  callbackURL: '/login/facebook/return',
  profileFields: ['displayName', 'name', 'email', 'link', 'locale', 'timezone'],
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
  /* eslint-disable no-underscore-dangle */
  const loginName = 'facebook';
  const claimType = 'urn:facebook:access_token';

  const fooBar = async () => {
    if (req.user) {
      const userLogin = await _data_models__WEBPACK_IMPORTED_MODULE_2__["UserLogin"].findOne({
        attributes: ['name', 'key'],
        where: {
          name: loginName,
          key: profile.id
        }
      });

      if (userLogin) {
        // There is already a Facebook account that belongs to you.
        // Sign in with that account or delete it, then link it with your current account.
        done();
      } else {
        const user = await _data_models__WEBPACK_IMPORTED_MODULE_2__["User"].create({
          id: req.user.id,
          email: profile._json.email,
          logins: [{
            name: loginName,
            key: profile.id
          }],
          claims: [{
            type: claimType,
            value: profile.id
          }],
          profile: {
            displayName: profile.displayName,
            gender: profile._json.gender,
            picture: `https://graph.facebook.com/${profile.id}/picture?type=large`
          }
        }, {
          include: [{
            model: _data_models__WEBPACK_IMPORTED_MODULE_2__["UserLogin"],
            as: 'logins'
          }, {
            model: _data_models__WEBPACK_IMPORTED_MODULE_2__["UserClaim"],
            as: 'claims'
          }, {
            model: _data_models__WEBPACK_IMPORTED_MODULE_2__["UserProfile"],
            as: 'profile'
          }]
        });
        done(null, {
          id: user.id,
          email: user.email
        });
      }
    } else {
      const users = await _data_models__WEBPACK_IMPORTED_MODULE_2__["User"].findAll({
        attributes: ['id', 'email'],
        where: {
          '$logins.name$': loginName,
          '$logins.key$': profile.id
        },
        include: [{
          attributes: ['name', 'key'],
          model: _data_models__WEBPACK_IMPORTED_MODULE_2__["UserLogin"],
          as: 'logins',
          required: true
        }]
      });

      if (users.length) {
        const user = users[0].get({
          plain: true
        });
        done(null, user);
      } else {
        let user = await _data_models__WEBPACK_IMPORTED_MODULE_2__["User"].findOne({
          where: {
            email: profile._json.email
          }
        });

        if (user) {
          // There is already an account using this email address. Sign in to
          // that account and link it with Facebook manually from Account Settings.
          done(null);
        } else {
          user = await _data_models__WEBPACK_IMPORTED_MODULE_2__["User"].create({
            email: profile._json.email,
            emailConfirmed: true,
            logins: [{
              name: loginName,
              key: profile.id
            }],
            claims: [{
              type: claimType,
              value: accessToken
            }],
            profile: {
              displayName: profile.displayName,
              gender: profile._json.gender,
              picture: `https://graph.facebook.com/${profile.id}/picture?type=large`
            }
          }, {
            include: [{
              model: _data_models__WEBPACK_IMPORTED_MODULE_2__["UserLogin"],
              as: 'logins'
            }, {
              model: _data_models__WEBPACK_IMPORTED_MODULE_2__["UserClaim"],
              as: 'claims'
            }, {
              model: _data_models__WEBPACK_IMPORTED_MODULE_2__["UserProfile"],
              as: 'profile'
            }]
          });
          done(null, {
            id: user.id,
            email: user.email
          });
        }
      }
    }
  };

  fooBar().catch(done);
}));
/* harmony default export */ __webpack_exports__["default"] = (passport__WEBPACK_IMPORTED_MODULE_0___default.a);

/***/ }),

/***/ "./src/router.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var universal_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("universal-router");
/* harmony import */ var universal_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(universal_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/routes/index.js");
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */


/* harmony default export */ __webpack_exports__["default"] = (new universal_router__WEBPACK_IMPORTED_MODULE_0___default.a(_routes__WEBPACK_IMPORTED_MODULE_1__["default"], {
  resolveRoute(context, params) {
    if (typeof context.route.load === 'function') {
      return context.route.load().then(action => action.default(context, params));
    }

    if (typeof context.route.action === 'function') {
      return context.route.action(context, params);
    }

    return undefined;
  }

}));

/***/ }),

/***/ "./src/routes/error/ErrorPage.css":
/***/ (function(module, exports, __webpack_require__) {


    var refs = 0;
    var css = __webpack_require__("./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/routes/error/ErrorPage.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/insertCss.js");
    var content = typeof css === 'string' ? [[module.i, css, '']] : css;

    exports = module.exports = css.locals || {};
    exports._getContent = function() { return content; };
    exports._getCss = function() { return '' + css; };
    exports._insertCss = function(options) { return insertCss(content, options) };

    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if ( true && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/routes/error/ErrorPage.css", function() {
        css = __webpack_require__("./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/routes/error/ErrorPage.css");
        content = typeof css === 'string' ? [[module.i, css, '']] : css;
        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/routes/error/ErrorPage.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorPageWithoutStyle", function() { return ErrorPageWithoutStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ErrorPage; });
/* harmony import */ var isomorphic_style_loader_useStyles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("isomorphic-style-loader/useStyles");
/* harmony import */ var isomorphic_style_loader_useStyles__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(isomorphic_style_loader_useStyles__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ErrorPage_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/routes/error/ErrorPage.css");
/* harmony import */ var _ErrorPage_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ErrorPage_css__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/Users/scottjoyner/git/financial-planner/src/routes/error/ErrorPage.js";

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




function ErrorPageWithoutStyle({
  error
}) {
  if ( true && error) {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h1", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 19
      },
      __self: this
    }, error.name), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("pre", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 20
      },
      __self: this
    }, error.stack));
  }

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h1", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: this
  }, "Error"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: this
  }, "Sorry, a critical error occurred on this page."));
}
ErrorPageWithoutStyle.propTypes = {
  error: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.shape({
    name: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired,
    message: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired,
    stack: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired
  })
};
ErrorPageWithoutStyle.defaultProps = {
  error: null
};
function ErrorPage(props) {
  isomorphic_style_loader_useStyles__WEBPACK_IMPORTED_MODULE_0___default()(_ErrorPage_css__WEBPACK_IMPORTED_MODULE_3___default.a);
  return ErrorPageWithoutStyle(props);
}

/***/ }),

/***/ "./src/routes/error/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ErrorPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/routes/error/ErrorPage.js");
var _jsxFileName = "/Users/scottjoyner/git/financial-planner/src/routes/error/index.js";

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */



function action() {
  return {
    title: 'Demo Error',
    component: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ErrorPage__WEBPACK_IMPORTED_MODULE_1__["default"], {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 16
      },
      __self: this
    })
  };
}

/* harmony default export */ __webpack_exports__["default"] = (action);

/***/ }),

/***/ "./src/routes/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable global-require */
// The top-level (parent) route
const routes = {
  path: '',
  // Keep in mind, routes are evaluated in order
  children: [{
    path: '',
    load: () => Promise.all(/* import() | home */[__webpack_require__.e("vendors~about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("home")]).then(__webpack_require__.bind(null, "./src/routes/home/index.js"))
  }, {
    path: '/contact',
    load: () => Promise.all(/* import() | contact */[__webpack_require__.e("vendors~about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("contact")]).then(__webpack_require__.bind(null, "./src/routes/contact/index.js"))
  }, {
    path: '/login',
    load: () => Promise.all(/* import() | login */[__webpack_require__.e("vendors~about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("login")]).then(__webpack_require__.bind(null, "./src/routes/login/index.js"))
  }, {
    path: '/register',
    load: () => Promise.all(/* import() | register */[__webpack_require__.e("vendors~about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("register")]).then(__webpack_require__.bind(null, "./src/routes/register/index.js"))
  }, {
    path: '/about',
    load: () => Promise.all(/* import() | about */[__webpack_require__.e("vendors~about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("about")]).then(__webpack_require__.bind(null, "./src/routes/about/index.js"))
  }, {
    path: '/privacy',
    load: () => Promise.all(/* import() | privacy */[__webpack_require__.e("vendors~about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("privacy")]).then(__webpack_require__.bind(null, "./src/routes/privacy/index.js"))
  }, {
    path: '/admin',
    load: () => Promise.all(/* import() | admin */[__webpack_require__.e("vendors~about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("admin")]).then(__webpack_require__.bind(null, "./src/routes/admin/index.js"))
  }, // Wildcard routes, e.g. { path: '(.*)', ... } (must go last)
  {
    path: '(.*)',
    load: () => Promise.all(/* import() | not-found */[__webpack_require__.e("vendors~about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("not-found")]).then(__webpack_require__.bind(null, "./src/routes/not-found/index.js"))
  }],

  async action({
    next
  }) {
    // Execute each child route until one of them return the result
    const route = await next(); // Provide default values for title, description etc.

    route.title = `${route.title || 'Untitled Page'} - www.reactstarterkit.com`;
    route.description = route.description || '';
    return route;
  }

}; // The error page is available by permanent url for development mode

if (true) {
  routes.children.unshift({
    path: '/error',
    action: __webpack_require__("./src/routes/error/index.js").default
  });
}

/* harmony default export */ __webpack_exports__["default"] = (routes);

/***/ }),

/***/ "./src/server.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("cookie-parser");
/* harmony import */ var cookie_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cookie_parser__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("body-parser");
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var express_jwt__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("express-jwt");
/* harmony import */ var express_jwt__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(express_jwt__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("graphql");
/* harmony import */ var graphql__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(graphql__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var express_graphql__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("express-graphql");
/* harmony import */ var express_graphql__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(express_graphql__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("node-fetch");
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(node_fetch__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("react-dom/server");
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var pretty_error__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("pretty-error");
/* harmony import */ var pretty_error__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(pretty_error__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./src/components/App.js");
/* harmony import */ var _components_Html__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./src/components/Html.js");
/* harmony import */ var _routes_error_ErrorPage__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("./src/routes/error/ErrorPage.js");
/* harmony import */ var _routes_error_ErrorPage_css__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("./src/routes/error/ErrorPage.css");
/* harmony import */ var _routes_error_ErrorPage_css__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_routes_error_ErrorPage_css__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _createFetch__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("./src/createFetch.js");
/* harmony import */ var _passport__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__("./src/passport.js");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("./src/router.js");
/* harmony import */ var _data_models__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__("./src/data/models/index.js");
/* harmony import */ var _data_schema__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__("./src/data/schema.js");
/* harmony import */ var _chunk_manifest_json__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__("./chunk-manifest.json");
/* harmony import */ var _chunk_manifest_json__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_chunk_manifest_json__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__("./src/config.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_22__);
var _jsxFileName = "/Users/scottjoyner/git/financial-planner/src/server.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




















 // import assets from './asset-manifest.json'; // eslint-disable-line import/no-unresolved

 // eslint-disable-line import/no-unresolved


process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason); // send entire app down. Process manager will restart it

  process.exit(1);
}); //
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------

global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';
const app = express__WEBPACK_IMPORTED_MODULE_1___default()(); //
// If you are using proxy from external machine, you can set TRUST_PROXY env
// Default is to trust proxy headers only from loopback interface.
// -----------------------------------------------------------------------------

app.set('trust proxy', _config__WEBPACK_IMPORTED_MODULE_22___default.a.trustProxy); //
// Register Node.js middleware
// -----------------------------------------------------------------------------

app.use(express__WEBPACK_IMPORTED_MODULE_1___default.a.static(path__WEBPACK_IMPORTED_MODULE_0___default.a.resolve(__dirname, 'public')));
app.use(cookie_parser__WEBPACK_IMPORTED_MODULE_2___default()());
app.use(body_parser__WEBPACK_IMPORTED_MODULE_3___default.a.urlencoded({
  extended: true
}));
app.use(body_parser__WEBPACK_IMPORTED_MODULE_3___default.a.json()); //
// Authentication
// -----------------------------------------------------------------------------

app.use(express_jwt__WEBPACK_IMPORTED_MODULE_4___default()({
  secret: _config__WEBPACK_IMPORTED_MODULE_22___default.a.auth.jwt.secret,
  credentialsRequired: false,
  getToken: req => req.cookies.id_token
})); // Error handler for express-jwt

app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  if (err instanceof express_jwt__WEBPACK_IMPORTED_MODULE_4__["UnauthorizedError"]) {
    console.error('[express-jwt-error]', req.cookies.id_token); // `clearCookie`, otherwise user can't use web-app until cookie expires

    res.clearCookie('id_token');
  }

  next(err);
});
app.use(_passport__WEBPACK_IMPORTED_MODULE_17__["default"].initialize());
app.get('/login/facebook', _passport__WEBPACK_IMPORTED_MODULE_17__["default"].authenticate('facebook', {
  scope: ['email', 'user_location'],
  session: false
}));
app.get('/login/facebook/return', _passport__WEBPACK_IMPORTED_MODULE_17__["default"].authenticate('facebook', {
  failureRedirect: '/login',
  session: false
}), (req, res) => {
  const expiresIn = 60 * 60 * 24 * 180; // 180 days

  const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_7___default.a.sign(req.user, _config__WEBPACK_IMPORTED_MODULE_22___default.a.auth.jwt.secret, {
    expiresIn
  });
  res.cookie('id_token', token, {
    maxAge: 1000 * expiresIn,
    httpOnly: true
  });
  res.redirect('/');
}); //
// Register API middleware
// -----------------------------------------------------------------------------

app.use('/graphql', express_graphql__WEBPACK_IMPORTED_MODULE_6___default()(req => ({
  schema: _data_schema__WEBPACK_IMPORTED_MODULE_20__["default"],
  graphiql: true,
  rootValue: {
    request: req
  },
  pretty: true
}))); //
// Register server-side rendering middleware
// -----------------------------------------------------------------------------

app.get('*', async (req, res, next) => {
  try {
    const css = new Set(); // Enables critical path CSS rendering
    // https://github.com/kriasoft/isomorphic-style-loader

    const insertCss = (...styles) => {
      // eslint-disable-next-line no-underscore-dangle
      styles.forEach(style => css.add(style._getCss()));
    }; // Universal HTTP client


    const fetch = Object(_createFetch__WEBPACK_IMPORTED_MODULE_16__["default"])(node_fetch__WEBPACK_IMPORTED_MODULE_8___default.a, {
      baseUrl: _config__WEBPACK_IMPORTED_MODULE_22___default.a.api.serverUrl,
      cookie: req.headers.cookie,
      schema: _data_schema__WEBPACK_IMPORTED_MODULE_20__["default"],
      graphql: graphql__WEBPACK_IMPORTED_MODULE_5__["graphql"]
    }); // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html

    const context = {
      fetch,
      // The twins below are wild, be careful!
      pathname: req.path,
      query: req.query
    };
    const route = await _router__WEBPACK_IMPORTED_MODULE_18__["default"].resolve(context);

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    const data = { ...route
    };
    data.children = react_dom_server__WEBPACK_IMPORTED_MODULE_10___default.a.renderToString(react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_components_App__WEBPACK_IMPORTED_MODULE_12__["default"], {
      context: context,
      insertCss: insertCss,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 161
      },
      __self: undefined
    }, route.component));
    data.styles = [{
      id: 'css',
      cssText: [...css].join('')
    }];
    const scripts = new Set();

    const addChunk = chunk => {
      if (_chunk_manifest_json__WEBPACK_IMPORTED_MODULE_21___default.a[chunk]) {
        _chunk_manifest_json__WEBPACK_IMPORTED_MODULE_21___default.a[chunk].forEach(asset => scripts.add(asset));
      } else if (true) {
        throw new Error(`Chunk with name '${chunk}' cannot be found`);
      }
    };

    addChunk('client');
    if (route.chunk) addChunk(route.chunk);
    if (route.chunks) route.chunks.forEach(addChunk);
    data.scripts = Array.from(scripts);
    data.app = {
      apiUrl: _config__WEBPACK_IMPORTED_MODULE_22___default.a.api.clientUrl
    };
    const html = react_dom_server__WEBPACK_IMPORTED_MODULE_10___default.a.renderToStaticMarkup(react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_components_Html__WEBPACK_IMPORTED_MODULE_13__["default"], _extends({}, data, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 184
      },
      __self: undefined
    })));
    res.status(route.status || 200);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
}); //
// Error handling
// -----------------------------------------------------------------------------

const pe = new pretty_error__WEBPACK_IMPORTED_MODULE_11___default.a();
pe.skipNodeFiles();
pe.skipPackage('express'); // eslint-disable-next-line no-unused-vars

app.use((err, req, res, next) => {
  console.error(pe.render(err));
  const html = react_dom_server__WEBPACK_IMPORTED_MODULE_10___default.a.renderToStaticMarkup(react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_components_Html__WEBPACK_IMPORTED_MODULE_13__["default"], {
    title: "Internal Server Error",
    description: err.message,
    styles: [{
      id: 'css',
      cssText: _routes_error_ErrorPage_css__WEBPACK_IMPORTED_MODULE_15___default.a._getCss()
    }] // eslint-disable-line no-underscore-dangle
    ,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 203
    },
    __self: undefined
  }, react_dom_server__WEBPACK_IMPORTED_MODULE_10___default.a.renderToString(react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(_routes_error_ErrorPage__WEBPACK_IMPORTED_MODULE_14__["ErrorPageWithoutStyle"], {
    error: err,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 208
    },
    __self: undefined
  }))));
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
}); //
// Launch the server
// -----------------------------------------------------------------------------

const promise = _data_models__WEBPACK_IMPORTED_MODULE_19__["default"].sync().catch(err => console.error(err.stack));

if (false) {} //
// Hot Module Replacement
// -----------------------------------------------------------------------------


if (true) {
  app.hot = module.hot;
  module.hot.accept("./src/router.js", function() { /* harmony import */ _router__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__("./src/router.js");
 });
}

/* harmony default export */ __webpack_exports__["default"] = (app);

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("@babel/polyfill");
module.exports = __webpack_require__("./src/server.js");


/***/ }),

/***/ "@babel/polyfill":
/***/ (function(module, exports) {

module.exports = require("@babel/polyfill");

/***/ }),

/***/ "body-parser":
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "cookie-parser":
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),

/***/ "express":
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "express-graphql":
/***/ (function(module, exports) {

module.exports = require("express-graphql");

/***/ }),

/***/ "express-jwt":
/***/ (function(module, exports) {

module.exports = require("express-jwt");

/***/ }),

/***/ "graphql":
/***/ (function(module, exports) {

module.exports = require("graphql");

/***/ }),

/***/ "history":
/***/ (function(module, exports) {

module.exports = require("history");

/***/ }),

/***/ "isomorphic-style-loader/StyleContext":
/***/ (function(module, exports) {

module.exports = require("isomorphic-style-loader/StyleContext");

/***/ }),

/***/ "isomorphic-style-loader/useStyles":
/***/ (function(module, exports) {

module.exports = require("isomorphic-style-loader/useStyles");

/***/ }),

/***/ "jsonwebtoken":
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "node-fetch":
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ }),

/***/ "passport":
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),

/***/ "passport-facebook":
/***/ (function(module, exports) {

module.exports = require("passport-facebook");

/***/ }),

/***/ "path":
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "pretty-error":
/***/ (function(module, exports) {

module.exports = require("pretty-error");

/***/ }),

/***/ "prop-types":
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ "react":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-dom/server":
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),

/***/ "sequelize":
/***/ (function(module, exports) {

module.exports = require("sequelize");

/***/ }),

/***/ "serialize-javascript":
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ }),

/***/ "universal-router":
/***/ (function(module, exports) {

module.exports = require("universal-router");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlcyI6WyIvVXNlcnMvc2NvdHRqb3luZXIvZ2l0L2ZpbmFuY2lhbC1wbGFubmVyL3dlYnBhY2svYm9vdHN0cmFwIiwiL1VzZXJzL3Njb3R0am95bmVyL2dpdC9maW5hbmNpYWwtcGxhbm5lci9leHRlcm5hbCBcIi4vY2h1bmstbWFuaWZlc3QuanNvblwiIiwiL1VzZXJzL3Njb3R0am95bmVyL2dpdC9maW5hbmNpYWwtcGxhbm5lci9zcmMvcm91dGVzL2Vycm9yL0Vycm9yUGFnZS5jc3MiLCIvVXNlcnMvc2NvdHRqb3luZXIvZ2l0L2ZpbmFuY2lhbC1wbGFubmVyL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCIvVXNlcnMvc2NvdHRqb3luZXIvZ2l0L2ZpbmFuY2lhbC1wbGFubmVyL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9pbnNlcnRDc3MuanMiLCIvVXNlcnMvc2NvdHRqb3luZXIvZ2l0L2ZpbmFuY2lhbC1wbGFubmVyL3NyYy9jb21wb25lbnRzL0FwcC5qcyIsIi9Vc2Vycy9zY290dGpveW5lci9naXQvZmluYW5jaWFsLXBsYW5uZXIvc3JjL2NvbXBvbmVudHMvQXBwbGljYXRpb25Db250ZXh0LmpzIiwiL1VzZXJzL3Njb3R0am95bmVyL2dpdC9maW5hbmNpYWwtcGxhbm5lci9zcmMvY29tcG9uZW50cy9IdG1sLmpzIiwiL1VzZXJzL3Njb3R0am95bmVyL2dpdC9maW5hbmNpYWwtcGxhbm5lci9zcmMvY29uZmlnLmpzIiwiL1VzZXJzL3Njb3R0am95bmVyL2dpdC9maW5hbmNpYWwtcGxhbm5lci9zcmMvY3JlYXRlRmV0Y2guanMiLCIvVXNlcnMvc2NvdHRqb3luZXIvZ2l0L2ZpbmFuY2lhbC1wbGFubmVyL3NyYy9kYXRhL21vZGVscy9Vc2VyLmpzIiwiL1VzZXJzL3Njb3R0am95bmVyL2dpdC9maW5hbmNpYWwtcGxhbm5lci9zcmMvZGF0YS9tb2RlbHMvVXNlckNsYWltLmpzIiwiL1VzZXJzL3Njb3R0am95bmVyL2dpdC9maW5hbmNpYWwtcGxhbm5lci9zcmMvZGF0YS9tb2RlbHMvVXNlckxvZ2luLmpzIiwiL1VzZXJzL3Njb3R0am95bmVyL2dpdC9maW5hbmNpYWwtcGxhbm5lci9zcmMvZGF0YS9tb2RlbHMvVXNlclByb2ZpbGUuanMiLCIvVXNlcnMvc2NvdHRqb3luZXIvZ2l0L2ZpbmFuY2lhbC1wbGFubmVyL3NyYy9kYXRhL21vZGVscy9pbmRleC5qcyIsIi9Vc2Vycy9zY290dGpveW5lci9naXQvZmluYW5jaWFsLXBsYW5uZXIvc3JjL2RhdGEvcXVlcmllcy9tZS5qcyIsIi9Vc2Vycy9zY290dGpveW5lci9naXQvZmluYW5jaWFsLXBsYW5uZXIvc3JjL2RhdGEvcXVlcmllcy9uZXdzLmpzIiwiL1VzZXJzL3Njb3R0am95bmVyL2dpdC9maW5hbmNpYWwtcGxhbm5lci9zcmMvZGF0YS9zY2hlbWEuanMiLCIvVXNlcnMvc2NvdHRqb3luZXIvZ2l0L2ZpbmFuY2lhbC1wbGFubmVyL3NyYy9kYXRhL3NlcXVlbGl6ZS5qcyIsIi9Vc2Vycy9zY290dGpveW5lci9naXQvZmluYW5jaWFsLXBsYW5uZXIvc3JjL2RhdGEvdHlwZXMvTmV3c0l0ZW1UeXBlLmpzIiwiL1VzZXJzL3Njb3R0am95bmVyL2dpdC9maW5hbmNpYWwtcGxhbm5lci9zcmMvZGF0YS90eXBlcy9Vc2VyVHlwZS5qcyIsIi9Vc2Vycy9zY290dGpveW5lci9naXQvZmluYW5jaWFsLXBsYW5uZXIvc3JjL3Bhc3Nwb3J0LmpzIiwiL1VzZXJzL3Njb3R0am95bmVyL2dpdC9maW5hbmNpYWwtcGxhbm5lci9zcmMvcm91dGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9yb3V0ZXMvZXJyb3IvRXJyb3JQYWdlLmNzcz9iZTQyIiwiL1VzZXJzL3Njb3R0am95bmVyL2dpdC9maW5hbmNpYWwtcGxhbm5lci9zcmMvcm91dGVzL2Vycm9yL0Vycm9yUGFnZS5qcyIsIi9Vc2Vycy9zY290dGpveW5lci9naXQvZmluYW5jaWFsLXBsYW5uZXIvc3JjL3JvdXRlcy9lcnJvci9pbmRleC5qcyIsIi9Vc2Vycy9zY290dGpveW5lci9naXQvZmluYW5jaWFsLXBsYW5uZXIvc3JjL3JvdXRlcy9pbmRleC5qcyIsIi9Vc2Vycy9zY290dGpveW5lci9naXQvZmluYW5jaWFsLXBsYW5uZXIvc3JjL3NlcnZlci5qcyIsIi9Vc2Vycy9zY290dGpveW5lci9naXQvZmluYW5jaWFsLXBsYW5uZXIvZXh0ZXJuYWwgXCJAYmFiZWwvcG9seWZpbGxcIiIsIi9Vc2Vycy9zY290dGpveW5lci9naXQvZmluYW5jaWFsLXBsYW5uZXIvZXh0ZXJuYWwgXCJib2R5LXBhcnNlclwiIiwiL1VzZXJzL3Njb3R0am95bmVyL2dpdC9maW5hbmNpYWwtcGxhbm5lci9leHRlcm5hbCBcImNvb2tpZS1wYXJzZXJcIiIsIi9Vc2Vycy9zY290dGpveW5lci9naXQvZmluYW5jaWFsLXBsYW5uZXIvZXh0ZXJuYWwgXCJleHByZXNzXCIiLCIvVXNlcnMvc2NvdHRqb3luZXIvZ2l0L2ZpbmFuY2lhbC1wbGFubmVyL2V4dGVybmFsIFwiZXhwcmVzcy1ncmFwaHFsXCIiLCIvVXNlcnMvc2NvdHRqb3luZXIvZ2l0L2ZpbmFuY2lhbC1wbGFubmVyL2V4dGVybmFsIFwiZXhwcmVzcy1qd3RcIiIsIi9Vc2Vycy9zY290dGpveW5lci9naXQvZmluYW5jaWFsLXBsYW5uZXIvZXh0ZXJuYWwgXCJncmFwaHFsXCIiLCIvVXNlcnMvc2NvdHRqb3luZXIvZ2l0L2ZpbmFuY2lhbC1wbGFubmVyL2V4dGVybmFsIFwiaGlzdG9yeVwiIiwiL1VzZXJzL3Njb3R0am95bmVyL2dpdC9maW5hbmNpYWwtcGxhbm5lci9leHRlcm5hbCBcImlzb21vcnBoaWMtc3R5bGUtbG9hZGVyL1N0eWxlQ29udGV4dFwiIiwiL1VzZXJzL3Njb3R0am95bmVyL2dpdC9maW5hbmNpYWwtcGxhbm5lci9leHRlcm5hbCBcImlzb21vcnBoaWMtc3R5bGUtbG9hZGVyL3VzZVN0eWxlc1wiIiwiL1VzZXJzL3Njb3R0am95bmVyL2dpdC9maW5hbmNpYWwtcGxhbm5lci9leHRlcm5hbCBcImpzb253ZWJ0b2tlblwiIiwiL1VzZXJzL3Njb3R0am95bmVyL2dpdC9maW5hbmNpYWwtcGxhbm5lci9leHRlcm5hbCBcIm5vZGUtZmV0Y2hcIiIsIi9Vc2Vycy9zY290dGpveW5lci9naXQvZmluYW5jaWFsLXBsYW5uZXIvZXh0ZXJuYWwgXCJwYXNzcG9ydFwiIiwiL1VzZXJzL3Njb3R0am95bmVyL2dpdC9maW5hbmNpYWwtcGxhbm5lci9leHRlcm5hbCBcInBhc3Nwb3J0LWZhY2Vib29rXCIiLCIvVXNlcnMvc2NvdHRqb3luZXIvZ2l0L2ZpbmFuY2lhbC1wbGFubmVyL2V4dGVybmFsIFwicGF0aFwiIiwiL1VzZXJzL3Njb3R0am95bmVyL2dpdC9maW5hbmNpYWwtcGxhbm5lci9leHRlcm5hbCBcInByZXR0eS1lcnJvclwiIiwiL1VzZXJzL3Njb3R0am95bmVyL2dpdC9maW5hbmNpYWwtcGxhbm5lci9leHRlcm5hbCBcInByb3AtdHlwZXNcIiIsIi9Vc2Vycy9zY290dGpveW5lci9naXQvZmluYW5jaWFsLXBsYW5uZXIvZXh0ZXJuYWwgXCJyZWFjdFwiIiwiL1VzZXJzL3Njb3R0am95bmVyL2dpdC9maW5hbmNpYWwtcGxhbm5lci9leHRlcm5hbCBcInJlYWN0LWRvbS9zZXJ2ZXJcIiIsIi9Vc2Vycy9zY290dGpveW5lci9naXQvZmluYW5jaWFsLXBsYW5uZXIvZXh0ZXJuYWwgXCJzZXF1ZWxpemVcIiIsIi9Vc2Vycy9zY290dGpveW5lci9naXQvZmluYW5jaWFsLXBsYW5uZXIvZXh0ZXJuYWwgXCJzZXJpYWxpemUtamF2YXNjcmlwdFwiIiwiL1VzZXJzL3Njb3R0am95bmVyL2dpdC9maW5hbmNpYWwtcGxhbm5lci9leHRlcm5hbCBcInVuaXZlcnNhbC1yb3V0ZXJcIiJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHR2YXIgY2h1bmsgPSByZXF1aXJlKFwiLi9cIiArIFwidXBkYXRlcy9cIiArIGNodW5rSWQgKyBcIi5cIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc1wiKTtcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmsuaWQsIGNodW5rLm1vZHVsZXMpO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QoKSB7XG4gXHRcdHRyeSB7XG4gXHRcdFx0dmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIuL1wiICsgXCJ1cGRhdGVzL1wiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIik7XG4gXHRcdH0gY2F0Y2ggKGUpIHtcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gXHRcdH1cbiBcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSh1cGRhdGUpO1xuIFx0fVxuXG4gXHQvL2VzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RGlzcG9zZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdH1cblxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcIjEyY2EwN2U1MzQwMWQyMjE1MzUxXCI7XG4gXHR2YXIgaG90UmVxdWVzdFRpbWVvdXQgPSAxMDAwMDtcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRpZiAoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuIFx0XHRcdGlmIChtZS5ob3QuYWN0aXZlKSB7XG4gXHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuIFx0XHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgK1xuIFx0XHRcdFx0XHRcdHJlcXVlc3QgK1xuIFx0XHRcdFx0XHRcdFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdCk7XG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcbiBcdFx0fTtcbiBcdFx0dmFyIE9iamVjdEZhY3RvcnkgPSBmdW5jdGlvbiBPYmplY3RGYWN0b3J5KG5hbWUpIHtcbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xuIFx0XHRcdFx0fSxcbiBcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiBcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH07XG4gXHRcdGZvciAodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfX3dlYnBhY2tfcmVxdWlyZV9fLCBuYW1lKSAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJlXCIgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwidFwiXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIE9iamVjdEZhY3RvcnkobmFtZSkpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRmbi5lID0gZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicmVhZHlcIikgaG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkKS50aGVuKGZpbmlzaENodW5rTG9hZGluZywgZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcbiBcdFx0XHRcdHRocm93IGVycjtcbiBcdFx0XHR9KTtcblxuIFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcbiBcdFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XG4gXHRcdFx0XHRcdGlmICghaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9O1xuIFx0XHRmbi50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0XHRpZiAobW9kZSAmIDEpIHZhbHVlID0gZm4odmFsdWUpO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnQodmFsdWUsIG1vZGUgJiB+MSk7XG4gXHRcdH07XG4gXHRcdHJldHVybiBmbjtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIGhvdCA9IHtcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXG4gXHRcdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuIFx0XHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuIFx0XHRcdF9tYWluOiBob3RDdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkLFxuXG4gXHRcdFx0Ly8gTW9kdWxlIEFQSVxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0XHRlbHNlIGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0fSxcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGlmICghbCkgcmV0dXJuIGhvdFN0YXR1cztcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cbiBcdFx0fTtcbiBcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xuIFx0XHRyZXR1cm4gaG90O1xuIFx0fVxuXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcblxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XG4gXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuIFx0fVxuXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XG4gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RBdmFpbGFibGVGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdERlZmVycmVkO1xuXG4gXHQvLyBUaGUgdXBkYXRlIGluZm9cbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcbiBcdFx0dmFyIGlzTnVtYmVyID0gK2lkICsgXCJcIiA9PT0gaWQ7XG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSkge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcImlkbGVcIikge1xuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuIFx0XHR9XG4gXHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XG4gXHRcdHJldHVybiBob3REb3dubG9hZE1hbmlmZXN0KGhvdFJlcXVlc3RUaW1lb3V0KS50aGVuKGZ1bmN0aW9uKHVwZGF0ZSkge1xuIFx0XHRcdGlmICghdXBkYXRlKSB7XG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRcdFx0cmV0dXJuIG51bGw7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90QXZhaWxhYmxlRmlsZXNNYXAgPSB1cGRhdGUuYztcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XG5cbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRob3REZWZlcnJlZCA9IHtcbiBcdFx0XHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcbiBcdFx0XHRcdFx0cmVqZWN0OiByZWplY3RcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0aG90VXBkYXRlID0ge307XG4gXHRcdFx0Zm9yKHZhciBjaHVua0lkIGluIGluc3RhbGxlZENodW5rcylcbiBcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbG9uZS1ibG9ja3NcbiBcdFx0XHR7XG4gXHRcdFx0XHQvKmdsb2JhbHMgY2h1bmtJZCAqL1xuIFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIgJiZcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiZcbiBcdFx0XHRcdGhvdFdhaXRpbmdGaWxlcyA9PT0gMFxuIFx0XHRcdCkge1xuIFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gcHJvbWlzZTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSB8fCAhaG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0pXG4gXHRcdFx0cmV0dXJuO1xuIFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IGZhbHNlO1xuIFx0XHRmb3IgKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYgKC0taG90V2FpdGluZ0ZpbGVzID09PSAwICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDApIHtcbiBcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzKys7XG4gXHRcdFx0aG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RVcGRhdGVEb3dubG9hZGVkKCkge1xuIFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcbiBcdFx0dmFyIGRlZmVycmVkID0gaG90RGVmZXJyZWQ7XG4gXHRcdGhvdERlZmVycmVkID0gbnVsbDtcbiBcdFx0aWYgKCFkZWZlcnJlZCkgcmV0dXJuO1xuIFx0XHRpZiAoaG90QXBwbHlPblVwZGF0ZSkge1xuIFx0XHRcdC8vIFdyYXAgZGVmZXJyZWQgb2JqZWN0IGluIFByb21pc2UgdG8gbWFyayBpdCBhcyBhIHdlbGwtaGFuZGxlZCBQcm9taXNlIHRvXG4gXHRcdFx0Ly8gYXZvaWQgdHJpZ2dlcmluZyB1bmNhdWdodCBleGNlcHRpb24gd2FybmluZyBpbiBDaHJvbWUuXG4gXHRcdFx0Ly8gU2VlIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ2NTY2NlxuIFx0XHRcdFByb21pc2UucmVzb2x2ZSgpXG4gXHRcdFx0XHQudGhlbihmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIGhvdEFwcGx5KGhvdEFwcGx5T25VcGRhdGUpO1xuIFx0XHRcdFx0fSlcbiBcdFx0XHRcdC50aGVuKFxuIFx0XHRcdFx0XHRmdW5jdGlvbihyZXN1bHQpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XG4gXHRcdFx0XHRcdH0sXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnIpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHQpO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2godG9Nb2R1bGVJZChpZCkpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucykge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcInJlYWR5XCIpXG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xuIFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuIFx0XHR2YXIgY2I7XG4gXHRcdHZhciBpO1xuIFx0XHR2YXIgajtcbiBcdFx0dmFyIG1vZHVsZTtcbiBcdFx0dmFyIG1vZHVsZUlkO1xuXG4gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYodXBkYXRlTW9kdWxlSWQpIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW3VwZGF0ZU1vZHVsZUlkXTtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuIFx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5tYXAoZnVuY3Rpb24oaWQpIHtcbiBcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdGNoYWluOiBbaWRdLFxuIFx0XHRcdFx0XHRpZDogaWRcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcbiBcdFx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKCFtb2R1bGUgfHwgbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fbWFpbikge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0aWYgKCFwYXJlbnQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0aWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cblxuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHR0eXBlOiBcImFjY2VwdGVkXCIsXG4gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcbiBcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzOiBvdXRkYXRlZERlcGVuZGVuY2llc1xuIFx0XHRcdH07XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG4gXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XG4gXHRcdFx0XHRpZiAoYS5pbmRleE9mKGl0ZW0pID09PSAtMSkgYS5wdXNoKGl0ZW0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcblxuIFx0XHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKCkge1xuIFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVzdWx0Lm1vZHVsZUlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiXG4gXHRcdFx0KTtcbiBcdFx0fTtcblxuIFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xuIFx0XHRcdFx0LyoqIEB0eXBlIHtUT0RPfSAqL1xuIFx0XHRcdFx0dmFyIHJlc3VsdDtcbiBcdFx0XHRcdGlmIChob3RVcGRhdGVbaWRdKSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogaWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdC8qKiBAdHlwZSB7RXJyb3J8ZmFsc2V9ICovXG4gXHRcdFx0XHR2YXIgYWJvcnRFcnJvciA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBjaGFpbkluZm8gPSBcIlwiO1xuIFx0XHRcdFx0aWYgKHJlc3VsdC5jaGFpbikge1xuIFx0XHRcdFx0XHRjaGFpbkluZm8gPSBcIlxcblVwZGF0ZSBwcm9wYWdhdGlvbjogXCIgKyByZXN1bHQuY2hhaW4uam9pbihcIiAtPiBcIik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzd2l0Y2ggKHJlc3VsdC50eXBlKSB7XG4gXHRcdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdFwiIGluIFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucGFyZW50SWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcInVuYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblVuYWNjZXB0ZWQpIG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIgKyBjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQWNjZXB0ZWQpIG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRpc3Bvc2VkKSBvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRkZWZhdWx0OlxuIFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoYWJvcnRFcnJvcikge1xuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcbiBcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvQXBwbHkpIHtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHRcdFx0XHRmb3IgKG1vZHVsZUlkIGluIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdFx0XHRcdGlmIChcbiBcdFx0XHRcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0XHRcdFx0KVxuIFx0XHRcdFx0XHRcdCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQoXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSxcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXVxuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0Rpc3Bvc2UpIHtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cbiBcdFx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbaV07XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiZcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkICYmXG4gXHRcdFx0XHQvLyByZW1vdmVkIHNlbGYtYWNjZXB0ZWQgbW9kdWxlcyBzaG91bGQgbm90IGJlIHJlcXVpcmVkXG4gXHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSAhPT0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XG4gXHRcdFx0XHRcdG1vZHVsZTogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuIFx0XHRPYmplY3Qua2V5cyhob3RBdmFpbGFibGVGaWxlc01hcCkuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xuIFx0XHRcdFx0aG90RGlzcG9zZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0fSk7XG5cbiBcdFx0dmFyIGlkeDtcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG4gXHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRpZiAoIW1vZHVsZSkgY29udGludWU7XG5cbiBcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG4gXHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRjYiA9IGRpc3Bvc2VIYW5kbGVyc1tqXTtcbiBcdFx0XHRcdGNiKGRhdGEpO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF0gPSBkYXRhO1xuXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcbiBcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXG4gXHRcdFx0ZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxuIFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcbiBcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkge1xuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXG4gXHRcdHZhciBkZXBlbmRlbmN5O1xuIFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG4gXHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG4gXHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJhcHBseVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG4gXHRcdGhvdEN1cnJlbnRIYXNoID0gaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xuIFx0XHRcdFx0XHRcdGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG4gXHRcdFx0XHRcdFx0aWYgKGNiKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluZGV4T2YoY2IpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRjYiA9IGNhbGxiYWNrc1tpXTtcbiBcdFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdFx0Y2IobW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuIFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXG4gXHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjI7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcbiBcdFx0aWYgKGVycm9yKSB7XG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuIFx0XHR9XG5cbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiBcdFx0XHRyZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGNodW5rc1xuIFx0Ly8gXCIwXCIgbWVhbnMgXCJhbHJlYWR5IGxvYWRlZFwiXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcInNlcnZlclwiOiAwXG4gXHR9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCkge1xuIFx0XHR2YXIgcHJvbWlzZXMgPSBbXTtcblxuXG4gXHRcdC8vIHJlcXVpcmUoKSBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cbiBcdFx0Ly8gXCIwXCIgaXMgdGhlIHNpZ25hbCBmb3IgXCJhbHJlYWR5IGxvYWRlZFwiXG4gXHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSAhPT0gMCkge1xuIFx0XHRcdHZhciBjaHVuayA9IHJlcXVpcmUoXCIuL2NodW5rcy9cIiArICh7XCJ2ZW5kb3JzfmFib3V0fmFkbWlufmNvbnRhY3R+aG9tZX5sb2dpbn5ub3QtZm91bmR+cHJpdmFjeX5yZWdpc3RlclwiOlwidmVuZG9yc35hYm91dH5hZG1pbn5jb250YWN0fmhvbWV+bG9naW5+bm90LWZvdW5kfnByaXZhY3l+cmVnaXN0ZXJcIixcImFib3V0fmFkbWlufmNvbnRhY3R+aG9tZX5sb2dpbn5ub3QtZm91bmR+cHJpdmFjeX5yZWdpc3RlclwiOlwiYWJvdXR+YWRtaW5+Y29udGFjdH5ob21lfmxvZ2lufm5vdC1mb3VuZH5wcml2YWN5fnJlZ2lzdGVyXCIsXCJhYm91dFwiOlwiYWJvdXRcIixcImFkbWluXCI6XCJhZG1pblwiLFwiY29udGFjdFwiOlwiY29udGFjdFwiLFwiaG9tZVwiOlwiaG9tZVwiLFwibG9naW5cIjpcImxvZ2luXCIsXCJub3QtZm91bmRcIjpcIm5vdC1mb3VuZFwiLFwicHJpdmFjeVwiOlwicHJpdmFjeVwiLFwicmVnaXN0ZXJcIjpcInJlZ2lzdGVyXCJ9W2NodW5rSWRdfHxjaHVua0lkKSArIFwiLmpzXCIpO1xuIFx0XHRcdHZhciBtb3JlTW9kdWxlcyA9IGNodW5rLm1vZHVsZXMsIGNodW5rSWRzID0gY2h1bmsuaWRzO1xuIFx0XHRcdGZvcih2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZHNbaV1dID0gMDtcbiBcdFx0fVxuIFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9hc3NldHMvXCI7XG5cbiBcdC8vIHVuY2F1Z2h0IGVycm9yIGhhbmRsZXIgZm9yIHdlYnBhY2sgcnVudGltZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikge1xuIFx0XHRwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uKCkge1xuIFx0XHRcdHRocm93IGVycjsgLy8gY2F0Y2ggdGhpcyBlcnJvciBieSB1c2luZyBpbXBvcnQoKS5jYXRjaCgpXG4gXHRcdH0pO1xuIFx0fTtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBob3RDcmVhdGVSZXF1aXJlKDApKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9jaHVuay1tYW5pZmVzdC5qc29uXCIpOyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKHRydWUpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKipcXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXFxuICpcXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXFxuICpcXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxcbiAqL1xcblxcbmh0bWwge1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgLW1zLWZsZXgtcGFjazogY2VudGVyO1xcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgcGFkZGluZzogMCAzMnB4O1xcbiAgcGFkZGluZzogMCAycmVtO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBjb2xvcjogIzg4ODtcXG59XFxuXFxuYm9keSB7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbmgxIHtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBjb2xvcjogIzU1NTtcXG59XFxuXFxucHJlIHtcXG4gIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIkVycm9yUGFnZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7Ozs7Ozs7RUFPRTs7QUFFRjtFQUNFLG9CQUFhO0VBQWIsYUFBYTtFQUNiLHNCQUFtQjtNQUFuQixtQkFBbUI7RUFDbkIscUJBQXVCO01BQXZCLHVCQUF1QjtFQUN2QixlQUFlO0VBQWYsZUFBZTtFQUNmLFlBQVk7RUFDWix1QkFBdUI7RUFDdkIsa0JBQWtCO0VBQ2xCLFdBQVc7QUFDYjs7QUFFQTtFQUNFLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxxQkFBcUI7RUFDckIsZ0JBQWdCO0FBQ2xCXCIsXCJmaWxlXCI6XCJFcnJvclBhZ2UuY3NzXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qKlxcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcXG4gKlxcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cXG4gKlxcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXFxuICovXFxuXFxuaHRtbCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgcGFkZGluZzogMCAycmVtO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBjb2xvcjogIzg4ODtcXG59XFxuXFxuYm9keSB7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbmgxIHtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBjb2xvcjogIzU1NTtcXG59XFxuXFxucHJlIHtcXG4gIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxufVxcblwiXX1dKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1c2VTb3VyY2VNYXApIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICByZXR1cm4gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwie1wiKS5jb25jYXQoY29udGVudCwgXCJ9XCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKCcnKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIChtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSAnc3RyaW5nJykge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCAnJ11dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuICAgICAgdmFyIGlkID0gdGhpc1tpXVswXTtcblxuICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBtb2R1bGVzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIGl0ZW0gPSBtb2R1bGVzW19pXTsgLy8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuICAgICAgLy8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcbiAgICAgIC8vIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cbiAgICAgIC8vIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblxuICAgICAgaWYgKGl0ZW1bMF0gPT0gbnVsbCB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBpZiAobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuICAgICAgICB9IGVsc2UgaWYgKG1lZGlhUXVlcnkpIHtcbiAgICAgICAgICBpdGVtWzJdID0gXCIoXCIuY29uY2F0KGl0ZW1bMl0sIFwiKSBhbmQgKFwiKS5jb25jYXQobWVkaWFRdWVyeSwgXCIpXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJzsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1kZXN0cnVjdHVyaW5nXG5cbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHVzZVNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gdG9Db21tZW50KGNzc01hcHBpbmcpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn0gLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuXG5cbmZ1bmN0aW9uIHRvQ29tbWVudChzb3VyY2VNYXApIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpO1xuICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gIHJldHVybiBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG59IiwiLyohIElzb21vcnBoaWMgU3R5bGUgTG9hZGVyIHwgTUlUIExpY2Vuc2UgfCBodHRwczovL2dpdGh1Yi5jb20va3JpYXNvZnQvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW5zZXJ0ZWQgPSB7fTtcblxuZnVuY3Rpb24gYjY0RW5jb2RlVW5pY29kZShzdHIpIHtcbiAgcmV0dXJuIGJ0b2EoZW5jb2RlVVJJQ29tcG9uZW50KHN0cikucmVwbGFjZSgvJShbMC05QS1GXXsyfSkvZywgZnVuY3Rpb24gKG1hdGNoLCBwMSkge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKFwiMHhcIiArIHAxKTtcbiAgfSkpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVDc3MoaWRzKSB7XG4gIGlkcy5mb3JFYWNoKGZ1bmN0aW9uIChpZCkge1xuICAgIGlmICgtLWluc2VydGVkW2lkXSA8PSAwKSB7XG4gICAgICB2YXIgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcblxuICAgICAgaWYgKGVsZW0pIHtcbiAgICAgICAgZWxlbS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW0pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGluc2VydENzcyhzdHlsZXMsIF90ZW1wKSB7XG4gIHZhciBfcmVmID0gX3RlbXAgPT09IHZvaWQgMCA/IHt9IDogX3RlbXAsXG4gICAgICBfcmVmJHJlcGxhY2UgPSBfcmVmLnJlcGxhY2UsXG4gICAgICByZXBsYWNlID0gX3JlZiRyZXBsYWNlID09PSB2b2lkIDAgPyBmYWxzZSA6IF9yZWYkcmVwbGFjZSxcbiAgICAgIF9yZWYkcHJlcGVuZCA9IF9yZWYucHJlcGVuZCxcbiAgICAgIHByZXBlbmQgPSBfcmVmJHByZXBlbmQgPT09IHZvaWQgMCA/IGZhbHNlIDogX3JlZiRwcmVwZW5kLFxuICAgICAgX3JlZiRwcmVmaXggPSBfcmVmLnByZWZpeCxcbiAgICAgIHByZWZpeCA9IF9yZWYkcHJlZml4ID09PSB2b2lkIDAgPyAncycgOiBfcmVmJHByZWZpeDtcblxuICB2YXIgaWRzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgX3N0eWxlcyRpID0gc3R5bGVzW2ldLFxuICAgICAgICBtb2R1bGVJZCA9IF9zdHlsZXMkaVswXSxcbiAgICAgICAgY3NzID0gX3N0eWxlcyRpWzFdLFxuICAgICAgICBtZWRpYSA9IF9zdHlsZXMkaVsyXSxcbiAgICAgICAgc291cmNlTWFwID0gX3N0eWxlcyRpWzNdO1xuICAgIHZhciBpZCA9IFwiXCIgKyBwcmVmaXggKyBtb2R1bGVJZCArIFwiLVwiICsgaTtcbiAgICBpZHMucHVzaChpZCk7XG5cbiAgICBpZiAoaW5zZXJ0ZWRbaWRdKSB7XG4gICAgICBpZiAoIXJlcGxhY2UpIHtcbiAgICAgICAgaW5zZXJ0ZWRbaWRdKys7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGluc2VydGVkW2lkXSA9IDE7XG4gICAgdmFyIGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgdmFyIGNyZWF0ZSA9IGZhbHNlO1xuXG4gICAgaWYgKCFlbGVtKSB7XG4gICAgICBjcmVhdGUgPSB0cnVlO1xuICAgICAgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgICBlbGVtLnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0L2NzcycpO1xuICAgICAgZWxlbS5pZCA9IGlkO1xuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgbWVkaWEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBjc3NUZXh0ID0gY3NzO1xuXG4gICAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY3NzVGV4dCArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBiNjRFbmNvZGVVbmljb2RlKEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpICsgXCIqL1wiO1xuICAgICAgY3NzVGV4dCArPSBcIlxcbi8qIyBzb3VyY2VVUkw9XCIgKyBzb3VyY2VNYXAuZmlsZSArIFwiP1wiICsgaWQgKyBcIiovXCI7XG4gICAgfVxuXG4gICAgaWYgKCd0ZXh0Q29udGVudCcgaW4gZWxlbSkge1xuICAgICAgZWxlbS50ZXh0Q29udGVudCA9IGNzc1RleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW0uc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzVGV4dDtcbiAgICB9XG5cbiAgICBpZiAoY3JlYXRlKSB7XG4gICAgICBpZiAocHJlcGVuZCkge1xuICAgICAgICBkb2N1bWVudC5oZWFkLmluc2VydEJlZm9yZShlbGVtLCBkb2N1bWVudC5oZWFkLmNoaWxkTm9kZXNbMF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChlbGVtKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVtb3ZlQ3NzLmJpbmQobnVsbCwgaWRzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRDc3M7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbnNlcnRDc3MuanMubWFwXG4iLCIvKipcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQgU3R5bGVDb250ZXh0IGZyb20gJ2lzb21vcnBoaWMtc3R5bGUtbG9hZGVyL1N0eWxlQ29udGV4dCc7XG5pbXBvcnQgQXBwbGljYXRpb25Db250ZXh0IGZyb20gJy4vQXBwbGljYXRpb25Db250ZXh0JztcblxuLyoqXG4gKiBUaGUgdG9wLWxldmVsIFJlYWN0IGNvbXBvbmVudCBzZXR0aW5nIGNvbnRleHQgKGdsb2JhbCkgdmFyaWFibGVzXG4gKiB0aGF0IGNhbiBiZSBhY2Nlc3NlZCBmcm9tIGFsbCB0aGUgY2hpbGQgY29tcG9uZW50cy5cbiAqXG4gKiBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL2NvbnRleHQuaHRtbFxuICpcbiAqIFVzYWdlIGV4YW1wbGU6XG4gKlxuICogICBjb25zdCBjb250ZXh0ID0ge1xuICogICAgIGhpc3Rvcnk6IGNyZWF0ZUJyb3dzZXJIaXN0b3J5KCksXG4gKiAgICAgc3RvcmU6IGNyZWF0ZVN0b3JlKCksXG4gKiAgIH07XG4gKlxuICogICBSZWFjdERPTS5yZW5kZXIoXG4gKiAgICAgPEFwcCBjb250ZXh0PXtjb250ZXh0fSBpbnNlcnRDc3M9eygpID0+IHt9fT5cbiAqICAgICAgIDxMYXlvdXQ+XG4gKiAgICAgICAgIDxMYW5kaW5nUGFnZSAvPlxuICogICAgICAgPC9MYXlvdXQ+XG4gKiAgICAgPC9BcHA+LFxuICogICAgIGNvbnRhaW5lcixcbiAqICAgKTtcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBcHAoeyBjb250ZXh0LCBpbnNlcnRDc3MsIGNoaWxkcmVuIH0pIHtcbiAgLy8gTk9URTogSWYgeW91IG5lZWQgdG8gYWRkIG9yIG1vZGlmeSBoZWFkZXIsIGZvb3RlciBldGMuIG9mIHRoZSBhcHAsXG4gIC8vIHBsZWFzZSBkbyB0aGF0IGluc2lkZSB0aGUgTGF5b3V0IGNvbXBvbmVudC5cbiAgcmV0dXJuIChcbiAgICA8U3R5bGVDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt7IGluc2VydENzcyB9fT5cbiAgICAgIDxBcHBsaWNhdGlvbkNvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3sgY29udGV4dCB9fT5cbiAgICAgICAge1JlYWN0LkNoaWxkcmVuLm9ubHkoY2hpbGRyZW4pfVxuICAgICAgPC9BcHBsaWNhdGlvbkNvbnRleHQuUHJvdmlkZXI+XG4gICAgPC9TdHlsZUNvbnRleHQuUHJvdmlkZXI+XG4gICk7XG59XG5cbkFwcC5wcm9wVHlwZXMgPSB7XG4gIC8vIEVuYWJsZXMgY3JpdGljYWwgcGF0aCBDU1MgcmVuZGVyaW5nXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9rcmlhc29mdC9pc29tb3JwaGljLXN0eWxlLWxvYWRlclxuICBpbnNlcnRDc3M6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGNvbnRleHQ6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgLy8gVW5pdmVyc2FsIEhUVFAgY2xpZW50XG4gICAgZmV0Y2g6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgcGF0aG5hbWU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBxdWVyeTogUHJvcFR5cGVzLm9iamVjdCxcbiAgfSkuaXNSZXF1aXJlZCxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5lbGVtZW50LmlzUmVxdWlyZWQsXG59O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuY29uc3QgQXBwbGljYXRpb25Db250ZXh0ID0gUmVhY3QuY3JlYXRlQ29udGV4dCh7XG4gIGZldGNoOiAoKSA9PiB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdGZXRjaCBtZXRob2Qgbm90IGluaXRpYWxpemVkLicpO1xuICB9LFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEFwcGxpY2F0aW9uQ29udGV4dDtcbiIsIi8qKlxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc2VyaWFsaXplIGZyb20gJ3NlcmlhbGl6ZS1qYXZhc2NyaXB0JztcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnJztcblxuLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tZGFuZ2VyICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEh0bWwoe1xuICB0aXRsZSxcbiAgZGVzY3JpcHRpb24sXG4gIHN0eWxlcyxcbiAgc2NyaXB0cyxcbiAgYXBwLFxuICBjaGlsZHJlbixcbn0pIHtcbiAgcmV0dXJuIChcbiAgICA8aHRtbCBjbGFzc05hbWU9XCJuby1qc1wiIGxhbmc9XCJlblwiPlxuICAgICAgPGhlYWQ+XG4gICAgICAgIDxtZXRhIGNoYXJTZXQ9XCJ1dGYtOFwiIC8+XG4gICAgICAgIDxtZXRhIGh0dHBFcXVpdj1cIngtdWEtY29tcGF0aWJsZVwiIGNvbnRlbnQ9XCJpZT1lZGdlXCIgLz5cbiAgICAgICAgPHRpdGxlPnt0aXRsZX08L3RpdGxlPlxuICAgICAgICA8bWV0YSBuYW1lPVwiZGVzY3JpcHRpb25cIiBjb250ZW50PXtkZXNjcmlwdGlvbn0gLz5cbiAgICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xXCIgLz5cbiAgICAgICAge3NjcmlwdHMubWFwKHNjcmlwdCA9PiAoXG4gICAgICAgICAgPGxpbmsga2V5PXtzY3JpcHR9IHJlbD1cInByZWxvYWRcIiBocmVmPXtzY3JpcHR9IGFzPVwic2NyaXB0XCIgLz5cbiAgICAgICAgKSl9XG4gICAgICAgIDxsaW5rIHJlbD1cIm1hbmlmZXN0XCIgaHJlZj1cIi9zaXRlLndlYm1hbmlmZXN0XCIgLz5cbiAgICAgICAgPGxpbmsgcmVsPVwiYXBwbGUtdG91Y2gtaWNvblwiIGhyZWY9XCIvaWNvbi5wbmdcIiAvPlxuICAgICAgICB7c3R5bGVzLm1hcChzdHlsZSA9PiAoXG4gICAgICAgICAgPHN0eWxlXG4gICAgICAgICAgICBrZXk9e3N0eWxlLmlkfVxuICAgICAgICAgICAgaWQ9e3N0eWxlLmlkfVxuICAgICAgICAgICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3sgX19odG1sOiBzdHlsZS5jc3NUZXh0IH19XG4gICAgICAgICAgLz5cbiAgICAgICAgKSl9XG4gICAgICA8L2hlYWQ+XG4gICAgICA8Ym9keT5cbiAgICAgICAgPGRpdiBpZD1cImFwcFwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogY2hpbGRyZW4gfX0gLz5cbiAgICAgICAgPHNjcmlwdFxuICAgICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogYHdpbmRvdy5BcHA9JHtzZXJpYWxpemUoYXBwKX1gIH19XG4gICAgICAgIC8+XG4gICAgICAgIHtzY3JpcHRzLm1hcChzY3JpcHQgPT4gKFxuICAgICAgICAgIDxzY3JpcHQga2V5PXtzY3JpcHR9IHNyYz17c2NyaXB0fSAvPlxuICAgICAgICApKX1cbiAgICAgICAge2NvbmZpZy5hbmFseXRpY3MuZ29vZ2xlVHJhY2tpbmdJZCAmJiAoXG4gICAgICAgICAgPHNjcmlwdFxuICAgICAgICAgICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3tcbiAgICAgICAgICAgICAgX19odG1sOlxuICAgICAgICAgICAgICAgICd3aW5kb3cuZ2E9ZnVuY3Rpb24oKXtnYS5xLnB1c2goYXJndW1lbnRzKX07Z2EucT1bXTtnYS5sPStuZXcgRGF0ZTsnICtcbiAgICAgICAgICAgICAgICBgZ2EoJ2NyZWF0ZScsJyR7Y29uZmlnLmFuYWx5dGljcy5nb29nbGVUcmFja2luZ0lkfScsJ2F1dG8nKTtnYSgnc2VuZCcsJ3BhZ2V2aWV3JylgLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgICB7Y29uZmlnLmFuYWx5dGljcy5nb29nbGVUcmFja2luZ0lkICYmIChcbiAgICAgICAgICA8c2NyaXB0XG4gICAgICAgICAgICBzcmM9XCJodHRwczovL3d3dy5nb29nbGUtYW5hbHl0aWNzLmNvbS9hbmFseXRpY3MuanNcIlxuICAgICAgICAgICAgYXN5bmNcbiAgICAgICAgICAgIGRlZmVyXG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgIDwvYm9keT5cbiAgICA8L2h0bWw+XG4gICk7XG59XG5cbkh0bWwucHJvcFR5cGVzID0ge1xuICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBkZXNjcmlwdGlvbjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICBzdHlsZXM6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBpZDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgY3NzVGV4dDogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIH0pLmlzUmVxdWlyZWQsXG4gICksXG4gIHNjcmlwdHM6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCksXG4gIGFwcDogUHJvcFR5cGVzLm9iamVjdCwgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBjaGlsZHJlbjogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxufTtcblxuSHRtbC5kZWZhdWx0UHJvcHMgPSB7XG4gIHN0eWxlczogW10sXG4gIHNjcmlwdHM6IFtdLFxufTtcbiIsIi8qKlxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xuXG5pZiAocHJvY2Vzcy5lbnYuQlJPV1NFUikge1xuICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgJ0RvIG5vdCBpbXBvcnQgYGNvbmZpZy5qc2AgZnJvbSBpbnNpZGUgdGhlIGNsaWVudC1zaWRlIGNvZGUuJyxcbiAgKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIE5vZGUuanMgYXBwXG4gIHBvcnQ6IHByb2Nlc3MuZW52LlBPUlQgfHwgMzAwMCxcblxuICAvLyBodHRwczovL2V4cHJlc3Nqcy5jb20vZW4vZ3VpZGUvYmVoaW5kLXByb3hpZXMuaHRtbFxuICB0cnVzdFByb3h5OiBwcm9jZXNzLmVudi5UUlVTVF9QUk9YWSB8fCAnbG9vcGJhY2snLFxuXG4gIC8vIEFQSSBHYXRld2F5XG4gIGFwaToge1xuICAgIC8vIEFQSSBVUkwgdG8gYmUgdXNlZCBpbiB0aGUgY2xpZW50LXNpZGUgY29kZVxuICAgIGNsaWVudFVybDogcHJvY2Vzcy5lbnYuQVBJX0NMSUVOVF9VUkwgfHwgJycsXG4gICAgLy8gQVBJIFVSTCB0byBiZSB1c2VkIGluIHRoZSBzZXJ2ZXItc2lkZSBjb2RlXG4gICAgc2VydmVyVXJsOlxuICAgICAgcHJvY2Vzcy5lbnYuQVBJX1NFUlZFUl9VUkwgfHxcbiAgICAgIGBodHRwOi8vbG9jYWxob3N0OiR7cHJvY2Vzcy5lbnYuUE9SVCB8fCAzMDAwfWAsXG4gIH0sXG5cbiAgLy8gRGF0YWJhc2VcbiAgZGF0YWJhc2VVcmw6IHByb2Nlc3MuZW52LkRBVEFCQVNFX1VSTCB8fCAnc3FsaXRlOmRhdGFiYXNlLnNxbGl0ZScsXG5cbiAgLy8gV2ViIGFuYWx5dGljc1xuICBhbmFseXRpY3M6IHtcbiAgICAvLyBodHRwczovL2FuYWx5dGljcy5nb29nbGUuY29tL1xuICAgIGdvb2dsZVRyYWNraW5nSWQ6IHByb2Nlc3MuZW52LkdPT0dMRV9UUkFDS0lOR19JRCwgLy8gVUEtWFhYWFgtWFxuICB9LFxuXG4gIC8vIEF1dGhlbnRpY2F0aW9uXG4gIGF1dGg6IHtcbiAgICBqd3Q6IHsgc2VjcmV0OiBwcm9jZXNzLmVudi5KV1RfU0VDUkVUIHx8ICdSZWFjdCBTdGFydGVyIEtpdCcgfSxcblxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVycy5mYWNlYm9vay5jb20vXG4gICAgZmFjZWJvb2s6IHtcbiAgICAgIGlkOiBwcm9jZXNzLmVudi5GQUNFQk9PS19BUFBfSUQgfHwgJzE4NjI0NDU1MTc0NTYzMScsXG4gICAgICBzZWNyZXQ6XG4gICAgICAgIHByb2Nlc3MuZW52LkZBQ0VCT09LX0FQUF9TRUNSRVQgfHwgJ2E5NzBhZTMyNDBhYjRiOWI4YWFlMGY5ZjA2NjFjNmZjJyxcbiAgICB9LFxuXG4gICAgLy8gaHR0cHM6Ly9jbG91ZC5nb29nbGUuY29tL2NvbnNvbGUvcHJvamVjdFxuICAgIGdvb2dsZToge1xuICAgICAgaWQ6XG4gICAgICAgIHByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfSUQgfHxcbiAgICAgICAgJzI1MTQxMDczMDU1MC1haGNnMG91NW1nZmhsOGhsdWkxdXJydTdqbjVzMTJrbS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbScsXG4gICAgICBzZWNyZXQ6IHByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfU0VDUkVUIHx8ICdZOHlSOXlaQWhtOWpROEZLQUw4UUlFY2QnLFxuICAgIH0sXG5cbiAgICAvLyBodHRwczovL2FwcHMudHdpdHRlci5jb20vXG4gICAgdHdpdHRlcjoge1xuICAgICAga2V5OiBwcm9jZXNzLmVudi5UV0lUVEVSX0NPTlNVTUVSX0tFWSB8fCAnSWUyMEFadkxKSTJsUUQ1RHNneGdqYXVucycsXG4gICAgICBzZWNyZXQ6XG4gICAgICAgIHByb2Nlc3MuZW52LlRXSVRURVJfQ09OU1VNRVJfU0VDUkVUIHx8XG4gICAgICAgICdLVFo2Y3hvS25FYWtRQ2VTcFpsYVVDSldHQWxURUJKajB5MkVNa1VCdWpBN3pXU3ZhUScsXG4gICAgfSxcbiAgfSxcbn07XG4iLCIvKipcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbi8qIEBmbG93ICovXG5cbmltcG9ydCB0eXBlIHsgZ3JhcGhxbCBhcyBncmFwaHFUeXBlLCBHcmFwaFFMU2NoZW1hIH0gZnJvbSAnZ3JhcGhxbCc7XG5cbnR5cGUgRmV0Y2ggPSAodXJsOiBzdHJpbmcsIG9wdGlvbnM6ID9hbnkpID0+IFByb21pc2U8YW55PjtcblxudHlwZSBPcHRpb25zID0ge1xuICBiYXNlVXJsOiBzdHJpbmcsXG4gIGNvb2tpZT86IHN0cmluZyxcbiAgc2NoZW1hPzogR3JhcGhRTFNjaGVtYSxcbiAgZ3JhcGhxbD86IGdyYXBocVR5cGUsXG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSB3cmFwcGVyIGZ1bmN0aW9uIGFyb3VuZCB0aGUgSFRNTDUgRmV0Y2ggQVBJIHRoYXQgcHJvdmlkZXNcbiAqIGRlZmF1bHQgYXJndW1lbnRzIHRvIGZldGNoKC4uLikgYW5kIGlzIGludGVuZGVkIHRvIHJlZHVjZSB0aGUgYW1vdW50XG4gKiBvZiBib2lsZXJwbGF0ZSBjb2RlIGluIHRoZSBhcHBsaWNhdGlvbi5cbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2RvY3MvV2ViL0FQSS9GZXRjaF9BUEkvVXNpbmdfRmV0Y2hcbiAqL1xuZnVuY3Rpb24gY3JlYXRlRmV0Y2goXG4gIGZldGNoOiBGZXRjaCxcbiAgeyBiYXNlVXJsLCBjb29raWUsIHNjaGVtYSwgZ3JhcGhxbCB9OiBPcHRpb25zLFxuKSB7XG4gIC8vIE5PVEU6IFR3ZWFrIHRoZSBkZWZhdWx0IG9wdGlvbnMgdG8gc3VpdGUgeW91ciBhcHBsaWNhdGlvbiBuZWVkc1xuICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICBtZXRob2Q6ICdQT1NUJywgLy8gaGFuZHkgd2l0aCBHcmFwaFFMIGJhY2tlbmRzXG4gICAgbW9kZTogYmFzZVVybCA/ICdjb3JzJyA6ICdzYW1lLW9yaWdpbicsXG4gICAgY3JlZGVudGlhbHM6IGJhc2VVcmwgPyAnaW5jbHVkZScgOiAnc2FtZS1vcmlnaW4nLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgIC4uLihjb29raWUgPyB7IENvb2tpZTogY29va2llIH0gOiBudWxsKSxcbiAgICB9LFxuICB9O1xuXG4gIHJldHVybiBhc3luYyAodXJsOiBzdHJpbmcsIG9wdGlvbnM6IGFueSkgPT4ge1xuICAgIGNvbnN0IGlzR3JhcGhRTCA9IHVybC5zdGFydHNXaXRoKCcvZ3JhcGhxbCcpO1xuICAgIGlmIChzY2hlbWEgJiYgZ3JhcGhxbCAmJiBpc0dyYXBoUUwpIHtcbiAgICAgIC8vIFdlJ3JlIFNTUiwgc28gcm91dGUgdGhlIGdyYXBocWwgaW50ZXJuYWwgdG8gYXZvaWQgbGF0ZW5jeVxuICAgICAgY29uc3QgcXVlcnkgPSBKU09OLnBhcnNlKG9wdGlvbnMuYm9keSk7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBncmFwaHFsKFxuICAgICAgICBzY2hlbWEsXG4gICAgICAgIHF1ZXJ5LnF1ZXJ5LFxuICAgICAgICB7IHJlcXVlc3Q6IHt9IH0sIC8vIGZpbGwgaW4gcmVxdWVzdCB2YXJzIG5lZWRlZCBieSBncmFwaHFsXG4gICAgICAgIG51bGwsXG4gICAgICAgIHF1ZXJ5LnZhcmlhYmxlcyxcbiAgICAgICk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgICAgc3RhdHVzOiByZXN1bHQuZXJyb3JzID8gNDAwIDogMjAwLFxuICAgICAgICBqc29uOiAoKSA9PiBQcm9taXNlLnJlc29sdmUocmVzdWx0KSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBpc0dyYXBoUUwgfHwgdXJsLnN0YXJ0c1dpdGgoJy9hcGknKVxuICAgICAgPyBmZXRjaChgJHtiYXNlVXJsfSR7dXJsfWAsIHtcbiAgICAgICAgICAuLi5kZWZhdWx0cyxcbiAgICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIC4uLmRlZmF1bHRzLmhlYWRlcnMsXG4gICAgICAgICAgICAuLi4ob3B0aW9ucyAmJiBvcHRpb25zLmhlYWRlcnMpLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICA6IGZldGNoKHVybCwgb3B0aW9ucyk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUZldGNoO1xuIiwiLyoqXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXG4gKlxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgRGF0YVR5cGUgZnJvbSAnc2VxdWVsaXplJztcbmltcG9ydCBNb2RlbCBmcm9tICcuLi9zZXF1ZWxpemUnO1xuXG5jb25zdCBVc2VyID0gTW9kZWwuZGVmaW5lKFxuICAnVXNlcicsXG4gIHtcbiAgICBpZDoge1xuICAgICAgdHlwZTogRGF0YVR5cGUuVVVJRCxcbiAgICAgIGRlZmF1bHRWYWx1ZTogRGF0YVR5cGUuVVVJRFYxLFxuICAgICAgcHJpbWFyeUtleTogdHJ1ZSxcbiAgICB9LFxuXG4gICAgZW1haWw6IHtcbiAgICAgIHR5cGU6IERhdGFUeXBlLlNUUklORygyNTUpLFxuICAgICAgdmFsaWRhdGU6IHsgaXNFbWFpbDogdHJ1ZSB9LFxuICAgIH0sXG5cbiAgICBlbWFpbENvbmZpcm1lZDoge1xuICAgICAgdHlwZTogRGF0YVR5cGUuQk9PTEVBTixcbiAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGluZGV4ZXM6IFt7IGZpZWxkczogWydlbWFpbCddIH1dLFxuICB9LFxuKTtcblxuZXhwb3J0IGRlZmF1bHQgVXNlcjtcbiIsIi8qKlxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IERhdGFUeXBlIGZyb20gJ3NlcXVlbGl6ZSc7XG5pbXBvcnQgTW9kZWwgZnJvbSAnLi4vc2VxdWVsaXplJztcblxuY29uc3QgVXNlckNsYWltID0gTW9kZWwuZGVmaW5lKCdVc2VyQ2xhaW0nLCB7XG4gIHR5cGU6IHtcbiAgICB0eXBlOiBEYXRhVHlwZS5TVFJJTkcsXG4gIH0sXG5cbiAgdmFsdWU6IHtcbiAgICB0eXBlOiBEYXRhVHlwZS5TVFJJTkcsXG4gIH0sXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgVXNlckNsYWltO1xuIiwiLyoqXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXG4gKlxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgRGF0YVR5cGUgZnJvbSAnc2VxdWVsaXplJztcbmltcG9ydCBNb2RlbCBmcm9tICcuLi9zZXF1ZWxpemUnO1xuXG5jb25zdCBVc2VyTG9naW4gPSBNb2RlbC5kZWZpbmUoJ1VzZXJMb2dpbicsIHtcbiAgbmFtZToge1xuICAgIHR5cGU6IERhdGFUeXBlLlNUUklORyg1MCksXG4gICAgcHJpbWFyeUtleTogdHJ1ZSxcbiAgfSxcblxuICBrZXk6IHtcbiAgICB0eXBlOiBEYXRhVHlwZS5TVFJJTkcoMTAwKSxcbiAgICBwcmltYXJ5S2V5OiB0cnVlLFxuICB9LFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJMb2dpbjtcbiIsIi8qKlxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IERhdGFUeXBlIGZyb20gJ3NlcXVlbGl6ZSc7XG5pbXBvcnQgTW9kZWwgZnJvbSAnLi4vc2VxdWVsaXplJztcblxuY29uc3QgVXNlclByb2ZpbGUgPSBNb2RlbC5kZWZpbmUoJ1VzZXJQcm9maWxlJywge1xuICB1c2VySWQ6IHtcbiAgICB0eXBlOiBEYXRhVHlwZS5VVUlELFxuICAgIHByaW1hcnlLZXk6IHRydWUsXG4gIH0sXG5cbiAgZGlzcGxheU5hbWU6IHtcbiAgICB0eXBlOiBEYXRhVHlwZS5TVFJJTkcoMTAwKSxcbiAgfSxcblxuICBwaWN0dXJlOiB7XG4gICAgdHlwZTogRGF0YVR5cGUuU1RSSU5HKDI1NSksXG4gIH0sXG5cbiAgZ2VuZGVyOiB7XG4gICAgdHlwZTogRGF0YVR5cGUuU1RSSU5HKDUwKSxcbiAgfSxcblxuICBsb2NhdGlvbjoge1xuICAgIHR5cGU6IERhdGFUeXBlLlNUUklORygxMDApLFxuICB9LFxuXG4gIHdlYnNpdGU6IHtcbiAgICB0eXBlOiBEYXRhVHlwZS5TVFJJTkcoMjU1KSxcbiAgfSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBVc2VyUHJvZmlsZTtcbiIsIi8qKlxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IHNlcXVlbGl6ZSBmcm9tICcuLi9zZXF1ZWxpemUnO1xuaW1wb3J0IFVzZXIgZnJvbSAnLi9Vc2VyJztcbmltcG9ydCBVc2VyTG9naW4gZnJvbSAnLi9Vc2VyTG9naW4nO1xuaW1wb3J0IFVzZXJDbGFpbSBmcm9tICcuL1VzZXJDbGFpbSc7XG5pbXBvcnQgVXNlclByb2ZpbGUgZnJvbSAnLi9Vc2VyUHJvZmlsZSc7XG5cblVzZXIuaGFzTWFueShVc2VyTG9naW4sIHtcbiAgZm9yZWlnbktleTogJ3VzZXJJZCcsXG4gIGFzOiAnbG9naW5zJyxcbiAgb25VcGRhdGU6ICdjYXNjYWRlJyxcbiAgb25EZWxldGU6ICdjYXNjYWRlJyxcbn0pO1xuXG5Vc2VyLmhhc01hbnkoVXNlckNsYWltLCB7XG4gIGZvcmVpZ25LZXk6ICd1c2VySWQnLFxuICBhczogJ2NsYWltcycsXG4gIG9uVXBkYXRlOiAnY2FzY2FkZScsXG4gIG9uRGVsZXRlOiAnY2FzY2FkZScsXG59KTtcblxuVXNlci5oYXNPbmUoVXNlclByb2ZpbGUsIHtcbiAgZm9yZWlnbktleTogJ3VzZXJJZCcsXG4gIGFzOiAncHJvZmlsZScsXG4gIG9uVXBkYXRlOiAnY2FzY2FkZScsXG4gIG9uRGVsZXRlOiAnY2FzY2FkZScsXG59KTtcblxuZnVuY3Rpb24gc3luYyguLi5hcmdzKSB7XG4gIHJldHVybiBzZXF1ZWxpemUuc3luYyguLi5hcmdzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgeyBzeW5jIH07XG5leHBvcnQgeyBVc2VyLCBVc2VyTG9naW4sIFVzZXJDbGFpbSwgVXNlclByb2ZpbGUgfTtcbiIsIi8qKlxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IFVzZXJUeXBlIGZyb20gJy4uL3R5cGVzL1VzZXJUeXBlJztcblxuY29uc3QgbWUgPSB7XG4gIHR5cGU6IFVzZXJUeXBlLFxuICByZXNvbHZlKHsgcmVxdWVzdCB9KSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHJlcXVlc3QudXNlciAmJiB7XG4gICAgICAgIGlkOiByZXF1ZXN0LnVzZXIuaWQsXG4gICAgICAgIGVtYWlsOiByZXF1ZXN0LnVzZXIuZW1haWwsXG4gICAgICB9XG4gICAgKTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG1lO1xuIiwiLyoqXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXG4gKlxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgeyBHcmFwaFFMTGlzdCBhcyBMaXN0IH0gZnJvbSAnZ3JhcGhxbCc7XG5pbXBvcnQgZmV0Y2ggZnJvbSAnbm9kZS1mZXRjaCc7XG5pbXBvcnQgTmV3c0l0ZW1UeXBlIGZyb20gJy4uL3R5cGVzL05ld3NJdGVtVHlwZSc7XG5cbi8vIFJlYWN0LmpzIE5ld3MgRmVlZCAoUlNTKVxuY29uc3QgdXJsID1cbiAgJ2h0dHBzOi8vYXBpLnJzczJqc29uLmNvbS92MS9hcGkuanNvbicgK1xuICAnP3Jzc191cmw9aHR0cHMlM0ElMkYlMkZyZWFjdGpzbmV3cy5jb20lMkZmZWVkLnhtbCc7XG5cbmxldCBpdGVtcyA9IFtdO1xubGV0IGxhc3RGZXRjaFRhc2s7XG5sZXQgbGFzdEZldGNoVGltZSA9IG5ldyBEYXRlKDE5NzAsIDAsIDEpO1xuXG5jb25zdCBuZXdzID0ge1xuICB0eXBlOiBuZXcgTGlzdChOZXdzSXRlbVR5cGUpLFxuICByZXNvbHZlKCkge1xuICAgIGlmIChsYXN0RmV0Y2hUYXNrKSB7XG4gICAgICByZXR1cm4gbGFzdEZldGNoVGFzaztcbiAgICB9XG5cbiAgICBpZiAobmV3IERhdGUoKSAtIGxhc3RGZXRjaFRpbWUgPiAxMDAwICogNjAgKiAxMCAvKiAxMCBtaW5zICovKSB7XG4gICAgICBsYXN0RmV0Y2hUaW1lID0gbmV3IERhdGUoKTtcbiAgICAgIGxhc3RGZXRjaFRhc2sgPSBmZXRjaCh1cmwpXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSAnb2snKSB7XG4gICAgICAgICAgICBpdGVtcyA9IGRhdGEuaXRlbXM7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGFzdEZldGNoVGFzayA9IG51bGw7XG4gICAgICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICBsYXN0RmV0Y2hUYXNrID0gbnVsbDtcbiAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH0pO1xuXG4gICAgICBpZiAoaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBpdGVtcztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGxhc3RGZXRjaFRhc2s7XG4gICAgfVxuXG4gICAgcmV0dXJuIGl0ZW1zO1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgbmV3cztcbiIsIi8qKlxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IHtcbiAgR3JhcGhRTFNjaGVtYSBhcyBTY2hlbWEsXG4gIEdyYXBoUUxPYmplY3RUeXBlIGFzIE9iamVjdFR5cGUsXG59IGZyb20gJ2dyYXBocWwnO1xuXG5pbXBvcnQgbWUgZnJvbSAnLi9xdWVyaWVzL21lJztcbmltcG9ydCBuZXdzIGZyb20gJy4vcXVlcmllcy9uZXdzJztcblxuY29uc3Qgc2NoZW1hID0gbmV3IFNjaGVtYSh7XG4gIHF1ZXJ5OiBuZXcgT2JqZWN0VHlwZSh7XG4gICAgbmFtZTogJ1F1ZXJ5JyxcbiAgICBmaWVsZHM6IHtcbiAgICAgIG1lLFxuICAgICAgbmV3cyxcbiAgICB9LFxuICB9KSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBzY2hlbWE7XG4iLCIvKipcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCBTZXF1ZWxpemUsIHsgT3AgfSBmcm9tICdzZXF1ZWxpemUnO1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnO1xuXG5jb25zdCBzZXF1ZWxpemUgPSBuZXcgU2VxdWVsaXplKGNvbmZpZy5kYXRhYmFzZVVybCwge1xuICBvcGVyYXRvcnNBbGlhc2VzOiBPcCxcbiAgZGVmaW5lOiB7XG4gICAgZnJlZXplVGFibGVOYW1lOiB0cnVlLFxuICB9LFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHNlcXVlbGl6ZTtcbiIsIi8qKlxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IHtcbiAgR3JhcGhRTE9iamVjdFR5cGUgYXMgT2JqZWN0VHlwZSxcbiAgR3JhcGhRTFN0cmluZyBhcyBTdHJpbmdUeXBlLFxuICBHcmFwaFFMTm9uTnVsbCBhcyBOb25OdWxsLFxufSBmcm9tICdncmFwaHFsJztcblxuY29uc3QgTmV3c0l0ZW1UeXBlID0gbmV3IE9iamVjdFR5cGUoe1xuICBuYW1lOiAnTmV3c0l0ZW0nLFxuICBmaWVsZHM6IHtcbiAgICB0aXRsZTogeyB0eXBlOiBuZXcgTm9uTnVsbChTdHJpbmdUeXBlKSB9LFxuICAgIGxpbms6IHsgdHlwZTogbmV3IE5vbk51bGwoU3RyaW5nVHlwZSkgfSxcbiAgICBhdXRob3I6IHsgdHlwZTogU3RyaW5nVHlwZSB9LFxuICAgIHB1YkRhdGU6IHsgdHlwZTogbmV3IE5vbk51bGwoU3RyaW5nVHlwZSkgfSxcbiAgICBjb250ZW50OiB7IHR5cGU6IFN0cmluZ1R5cGUgfSxcbiAgfSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBOZXdzSXRlbVR5cGU7XG4iLCIvKipcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCB7XG4gIEdyYXBoUUxPYmplY3RUeXBlIGFzIE9iamVjdFR5cGUsXG4gIEdyYXBoUUxJRCBhcyBJRCxcbiAgR3JhcGhRTFN0cmluZyBhcyBTdHJpbmdUeXBlLFxuICBHcmFwaFFMTm9uTnVsbCBhcyBOb25OdWxsLFxufSBmcm9tICdncmFwaHFsJztcblxuY29uc3QgVXNlclR5cGUgPSBuZXcgT2JqZWN0VHlwZSh7XG4gIG5hbWU6ICdVc2VyJyxcbiAgZmllbGRzOiB7XG4gICAgaWQ6IHsgdHlwZTogbmV3IE5vbk51bGwoSUQpIH0sXG4gICAgZW1haWw6IHsgdHlwZTogU3RyaW5nVHlwZSB9LFxuICB9LFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJUeXBlO1xuIiwiLyoqXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXG4gKlxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4vKipcbiAqIFBhc3Nwb3J0LmpzIHJlZmVyZW5jZSBpbXBsZW1lbnRhdGlvbi5cbiAqIFRoZSBkYXRhYmFzZSBzY2hlbWEgdXNlZCBpbiB0aGlzIHNhbXBsZSBpcyBhdmFpbGFibGUgYXRcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9tZW1iZXJzaGlwL21lbWJlcnNoaXAuZGIvdHJlZS9tYXN0ZXIvcG9zdGdyZXNcbiAqL1xuXG5pbXBvcnQgcGFzc3BvcnQgZnJvbSAncGFzc3BvcnQnO1xuaW1wb3J0IHsgU3RyYXRlZ3kgYXMgRmFjZWJvb2tTdHJhdGVneSB9IGZyb20gJ3Bhc3Nwb3J0LWZhY2Vib29rJztcbmltcG9ydCB7IFVzZXIsIFVzZXJMb2dpbiwgVXNlckNsYWltLCBVc2VyUHJvZmlsZSB9IGZyb20gJy4vZGF0YS9tb2RlbHMnO1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZyc7XG5cbi8qKlxuICogU2lnbiBpbiB3aXRoIEZhY2Vib29rLlxuICovXG5wYXNzcG9ydC51c2UoXG4gIG5ldyBGYWNlYm9va1N0cmF0ZWd5KFxuICAgIHtcbiAgICAgIGNsaWVudElEOiBjb25maWcuYXV0aC5mYWNlYm9vay5pZCxcbiAgICAgIGNsaWVudFNlY3JldDogY29uZmlnLmF1dGguZmFjZWJvb2suc2VjcmV0LFxuICAgICAgY2FsbGJhY2tVUkw6ICcvbG9naW4vZmFjZWJvb2svcmV0dXJuJyxcbiAgICAgIHByb2ZpbGVGaWVsZHM6IFtcbiAgICAgICAgJ2Rpc3BsYXlOYW1lJyxcbiAgICAgICAgJ25hbWUnLFxuICAgICAgICAnZW1haWwnLFxuICAgICAgICAnbGluaycsXG4gICAgICAgICdsb2NhbGUnLFxuICAgICAgICAndGltZXpvbmUnLFxuICAgICAgXSxcbiAgICAgIHBhc3NSZXFUb0NhbGxiYWNrOiB0cnVlLFxuICAgIH0sXG4gICAgKHJlcSwgYWNjZXNzVG9rZW4sIHJlZnJlc2hUb2tlbiwgcHJvZmlsZSwgZG9uZSkgPT4ge1xuICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZXJzY29yZS1kYW5nbGUgKi9cbiAgICAgIGNvbnN0IGxvZ2luTmFtZSA9ICdmYWNlYm9vayc7XG4gICAgICBjb25zdCBjbGFpbVR5cGUgPSAndXJuOmZhY2Vib29rOmFjY2Vzc190b2tlbic7XG4gICAgICBjb25zdCBmb29CYXIgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmIChyZXEudXNlcikge1xuICAgICAgICAgIGNvbnN0IHVzZXJMb2dpbiA9IGF3YWl0IFVzZXJMb2dpbi5maW5kT25lKHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IFsnbmFtZScsICdrZXknXSxcbiAgICAgICAgICAgIHdoZXJlOiB7IG5hbWU6IGxvZ2luTmFtZSwga2V5OiBwcm9maWxlLmlkIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKHVzZXJMb2dpbikge1xuICAgICAgICAgICAgLy8gVGhlcmUgaXMgYWxyZWFkeSBhIEZhY2Vib29rIGFjY291bnQgdGhhdCBiZWxvbmdzIHRvIHlvdS5cbiAgICAgICAgICAgIC8vIFNpZ24gaW4gd2l0aCB0aGF0IGFjY291bnQgb3IgZGVsZXRlIGl0LCB0aGVuIGxpbmsgaXQgd2l0aCB5b3VyIGN1cnJlbnQgYWNjb3VudC5cbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIuY3JlYXRlKFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IHJlcS51c2VyLmlkLFxuICAgICAgICAgICAgICAgIGVtYWlsOiBwcm9maWxlLl9qc29uLmVtYWlsLFxuICAgICAgICAgICAgICAgIGxvZ2luczogW3sgbmFtZTogbG9naW5OYW1lLCBrZXk6IHByb2ZpbGUuaWQgfV0sXG4gICAgICAgICAgICAgICAgY2xhaW1zOiBbeyB0eXBlOiBjbGFpbVR5cGUsIHZhbHVlOiBwcm9maWxlLmlkIH1dLFxuICAgICAgICAgICAgICAgIHByb2ZpbGU6IHtcbiAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiBwcm9maWxlLmRpc3BsYXlOYW1lLFxuICAgICAgICAgICAgICAgICAgZ2VuZGVyOiBwcm9maWxlLl9qc29uLmdlbmRlcixcbiAgICAgICAgICAgICAgICAgIHBpY3R1cmU6IGBodHRwczovL2dyYXBoLmZhY2Vib29rLmNvbS8ke3Byb2ZpbGUuaWR9L3BpY3R1cmU/dHlwZT1sYXJnZWAsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFtcbiAgICAgICAgICAgICAgICAgIHsgbW9kZWw6IFVzZXJMb2dpbiwgYXM6ICdsb2dpbnMnIH0sXG4gICAgICAgICAgICAgICAgICB7IG1vZGVsOiBVc2VyQ2xhaW0sIGFzOiAnY2xhaW1zJyB9LFxuICAgICAgICAgICAgICAgICAgeyBtb2RlbDogVXNlclByb2ZpbGUsIGFzOiAncHJvZmlsZScgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGRvbmUobnVsbCwge1xuICAgICAgICAgICAgICBpZDogdXNlci5pZCxcbiAgICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgdXNlcnMgPSBhd2FpdCBVc2VyLmZpbmRBbGwoe1xuICAgICAgICAgICAgYXR0cmlidXRlczogWydpZCcsICdlbWFpbCddLFxuICAgICAgICAgICAgd2hlcmU6IHsgJyRsb2dpbnMubmFtZSQnOiBsb2dpbk5hbWUsICckbG9naW5zLmtleSQnOiBwcm9maWxlLmlkIH0sXG4gICAgICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBbJ25hbWUnLCAna2V5J10sXG4gICAgICAgICAgICAgICAgbW9kZWw6IFVzZXJMb2dpbixcbiAgICAgICAgICAgICAgICBhczogJ2xvZ2lucycsXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmICh1c2Vycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IHVzZXIgPSB1c2Vyc1swXS5nZXQoeyBwbGFpbjogdHJ1ZSB9KTtcbiAgICAgICAgICAgIGRvbmUobnVsbCwgdXNlcik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCB1c2VyID0gYXdhaXQgVXNlci5maW5kT25lKHtcbiAgICAgICAgICAgICAgd2hlcmU6IHsgZW1haWw6IHByb2ZpbGUuX2pzb24uZW1haWwgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICAgICAgLy8gVGhlcmUgaXMgYWxyZWFkeSBhbiBhY2NvdW50IHVzaW5nIHRoaXMgZW1haWwgYWRkcmVzcy4gU2lnbiBpbiB0b1xuICAgICAgICAgICAgICAvLyB0aGF0IGFjY291bnQgYW5kIGxpbmsgaXQgd2l0aCBGYWNlYm9vayBtYW51YWxseSBmcm9tIEFjY291bnQgU2V0dGluZ3MuXG4gICAgICAgICAgICAgIGRvbmUobnVsbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB1c2VyID0gYXdhaXQgVXNlci5jcmVhdGUoXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgZW1haWw6IHByb2ZpbGUuX2pzb24uZW1haWwsXG4gICAgICAgICAgICAgICAgICBlbWFpbENvbmZpcm1lZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIGxvZ2luczogW3sgbmFtZTogbG9naW5OYW1lLCBrZXk6IHByb2ZpbGUuaWQgfV0sXG4gICAgICAgICAgICAgICAgICBjbGFpbXM6IFt7IHR5cGU6IGNsYWltVHlwZSwgdmFsdWU6IGFjY2Vzc1Rva2VuIH1dLFxuICAgICAgICAgICAgICAgICAgcHJvZmlsZToge1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogcHJvZmlsZS5kaXNwbGF5TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgZ2VuZGVyOiBwcm9maWxlLl9qc29uLmdlbmRlcixcbiAgICAgICAgICAgICAgICAgICAgcGljdHVyZTogYGh0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tLyR7cHJvZmlsZS5pZH0vcGljdHVyZT90eXBlPWxhcmdlYCxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBpbmNsdWRlOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbW9kZWw6IFVzZXJMb2dpbiwgYXM6ICdsb2dpbnMnIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbW9kZWw6IFVzZXJDbGFpbSwgYXM6ICdjbGFpbXMnIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbW9kZWw6IFVzZXJQcm9maWxlLCBhczogJ3Byb2ZpbGUnIH0sXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGRvbmUobnVsbCwge1xuICAgICAgICAgICAgICAgIGlkOiB1c2VyLmlkLFxuICAgICAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGZvb0JhcigpLmNhdGNoKGRvbmUpO1xuICAgIH0sXG4gICksXG4pO1xuXG5leHBvcnQgZGVmYXVsdCBwYXNzcG9ydDtcbiIsIi8qKlxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IFVuaXZlcnNhbFJvdXRlciBmcm9tICd1bml2ZXJzYWwtcm91dGVyJztcbmltcG9ydCByb3V0ZXMgZnJvbSAnLi9yb3V0ZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBuZXcgVW5pdmVyc2FsUm91dGVyKHJvdXRlcywge1xuICByZXNvbHZlUm91dGUoY29udGV4dCwgcGFyYW1zKSB7XG4gICAgaWYgKHR5cGVvZiBjb250ZXh0LnJvdXRlLmxvYWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBjb250ZXh0LnJvdXRlXG4gICAgICAgIC5sb2FkKClcbiAgICAgICAgLnRoZW4oYWN0aW9uID0+IGFjdGlvbi5kZWZhdWx0KGNvbnRleHQsIHBhcmFtcykpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGNvbnRleHQucm91dGUuYWN0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gY29udGV4dC5yb3V0ZS5hY3Rpb24oY29udGV4dCwgcGFyYW1zKTtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfSxcbn0pO1xuIiwiXG4gICAgdmFyIHJlZnMgPSAwO1xuICAgIHZhciBjc3MgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS01LXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL3NyYy9pbmRleC5qcz8/cmVmLS01LXJ1bGVzLTMhLi9FcnJvclBhZ2UuY3NzXCIpO1xuICAgIHZhciBpbnNlcnRDc3MgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9pc29tb3JwaGljLXN0eWxlLWxvYWRlci9pbnNlcnRDc3MuanNcIik7XG4gICAgdmFyIGNvbnRlbnQgPSB0eXBlb2YgY3NzID09PSAnc3RyaW5nJyA/IFtbbW9kdWxlLmlkLCBjc3MsICcnXV0gOiBjc3M7XG5cbiAgICBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBjc3MubG9jYWxzIHx8IHt9O1xuICAgIGV4cG9ydHMuX2dldENvbnRlbnQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQ7IH07XG4gICAgZXhwb3J0cy5fZ2V0Q3NzID0gZnVuY3Rpb24oKSB7IHJldHVybiAnJyArIGNzczsgfTtcbiAgICBleHBvcnRzLl9pbnNlcnRDc3MgPSBmdW5jdGlvbihvcHRpb25zKSB7IHJldHVybiBpbnNlcnRDc3MoY29udGVudCwgb3B0aW9ucykgfTtcblxuICAgIC8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbiAgICAvLyBodHRwczovL3dlYnBhY2suZ2l0aHViLmlvL2RvY3MvaG90LW1vZHVsZS1yZXBsYWNlbWVudFxuICAgIC8vIE9ubHkgYWN0aXZhdGVkIGluIGJyb3dzZXIgY29udGV4dFxuICAgIGlmIChtb2R1bGUuaG90ICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCkge1xuICAgICAgdmFyIHJlbW92ZUNzcyA9IGZ1bmN0aW9uKCkge307XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tNS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9zcmMvaW5kZXguanM/P3JlZi0tNS1ydWxlcy0zIS4vRXJyb3JQYWdlLmNzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY3NzID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tNS1ydWxlcy0yIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9zcmMvaW5kZXguanM/P3JlZi0tNS1ydWxlcy0zIS4vRXJyb3JQYWdlLmNzc1wiKTtcbiAgICAgICAgY29udGVudCA9IHR5cGVvZiBjc3MgPT09ICdzdHJpbmcnID8gW1ttb2R1bGUuaWQsIGNzcywgJyddXSA6IGNzcztcbiAgICAgICAgcmVtb3ZlQ3NzID0gaW5zZXJ0Q3NzKGNvbnRlbnQsIHsgcmVwbGFjZTogdHJ1ZSB9KTtcbiAgICAgIH0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyByZW1vdmVDc3MoKTsgfSk7XG4gICAgfVxuICAiLCIvKipcbiAqIFJlYWN0IFN0YXJ0ZXIgS2l0IChodHRwczovL3d3dy5yZWFjdHN0YXJ0ZXJraXQuY29tLylcbiAqXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmltcG9ydCB1c2VTdHlsZXMgZnJvbSAnaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvdXNlU3R5bGVzJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHMgZnJvbSAnLi9FcnJvclBhZ2UuY3NzJztcblxuZXhwb3J0IGZ1bmN0aW9uIEVycm9yUGFnZVdpdGhvdXRTdHlsZSh7IGVycm9yIH0pIHtcbiAgaWYgKF9fREVWX18gJiYgZXJyb3IpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPD5cbiAgICAgICAgPGgxPntlcnJvci5uYW1lfTwvaDE+XG4gICAgICAgIDxwcmU+e2Vycm9yLnN0YWNrfTwvcHJlPlxuICAgICAgPC8+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxoMT5FcnJvcjwvaDE+XG4gICAgICA8cD5Tb3JyeSwgYSBjcml0aWNhbCBlcnJvciBvY2N1cnJlZCBvbiB0aGlzIHBhZ2UuPC9wPlxuICAgIDwvPlxuICApO1xufVxuXG5FcnJvclBhZ2VXaXRob3V0U3R5bGUucHJvcFR5cGVzID0ge1xuICBlcnJvcjogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gICAgbWVzc2FnZTogUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgIHN0YWNrOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIH0pLFxufTtcblxuRXJyb3JQYWdlV2l0aG91dFN0eWxlLmRlZmF1bHRQcm9wcyA9IHtcbiAgZXJyb3I6IG51bGwsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBFcnJvclBhZ2UocHJvcHMpIHtcbiAgdXNlU3R5bGVzKHMpO1xuICByZXR1cm4gRXJyb3JQYWdlV2l0aG91dFN0eWxlKHByb3BzKTtcbn1cbiIsIi8qKlxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBFcnJvclBhZ2UgZnJvbSAnLi9FcnJvclBhZ2UnO1xuXG5mdW5jdGlvbiBhY3Rpb24oKSB7XG4gIHJldHVybiB7XG4gICAgdGl0bGU6ICdEZW1vIEVycm9yJyxcbiAgICBjb21wb25lbnQ6IDxFcnJvclBhZ2UgLz4sXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFjdGlvbjtcbiIsIi8qKlxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuLyogZXNsaW50LWRpc2FibGUgZ2xvYmFsLXJlcXVpcmUgKi9cblxuLy8gVGhlIHRvcC1sZXZlbCAocGFyZW50KSByb3V0ZVxuY29uc3Qgcm91dGVzID0ge1xuICBwYXRoOiAnJyxcblxuICAvLyBLZWVwIGluIG1pbmQsIHJvdXRlcyBhcmUgZXZhbHVhdGVkIGluIG9yZGVyXG4gIGNoaWxkcmVuOiBbXG4gICAge1xuICAgICAgcGF0aDogJycsXG4gICAgICBsb2FkOiAoKSA9PiBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogJ2hvbWUnICovICcuL2hvbWUnKSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHBhdGg6ICcvY29udGFjdCcsXG4gICAgICBsb2FkOiAoKSA9PiBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogJ2NvbnRhY3QnICovICcuL2NvbnRhY3QnKSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHBhdGg6ICcvbG9naW4nLFxuICAgICAgbG9hZDogKCkgPT4gaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6ICdsb2dpbicgKi8gJy4vbG9naW4nKSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHBhdGg6ICcvcmVnaXN0ZXInLFxuICAgICAgbG9hZDogKCkgPT4gaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6ICdyZWdpc3RlcicgKi8gJy4vcmVnaXN0ZXInKSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHBhdGg6ICcvYWJvdXQnLFxuICAgICAgbG9hZDogKCkgPT4gaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6ICdhYm91dCcgKi8gJy4vYWJvdXQnKSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHBhdGg6ICcvcHJpdmFjeScsXG4gICAgICBsb2FkOiAoKSA9PiBpbXBvcnQoLyogd2VicGFja0NodW5rTmFtZTogJ3ByaXZhY3knICovICcuL3ByaXZhY3knKSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHBhdGg6ICcvYWRtaW4nLFxuICAgICAgbG9hZDogKCkgPT4gaW1wb3J0KC8qIHdlYnBhY2tDaHVua05hbWU6ICdhZG1pbicgKi8gJy4vYWRtaW4nKSxcbiAgICB9LFxuXG4gICAgLy8gV2lsZGNhcmQgcm91dGVzLCBlLmcuIHsgcGF0aDogJyguKiknLCAuLi4gfSAobXVzdCBnbyBsYXN0KVxuICAgIHtcbiAgICAgIHBhdGg6ICcoLiopJyxcbiAgICAgIGxvYWQ6ICgpID0+IGltcG9ydCgvKiB3ZWJwYWNrQ2h1bmtOYW1lOiAnbm90LWZvdW5kJyAqLyAnLi9ub3QtZm91bmQnKSxcbiAgICB9LFxuICBdLFxuXG4gIGFzeW5jIGFjdGlvbih7IG5leHQgfSkge1xuICAgIC8vIEV4ZWN1dGUgZWFjaCBjaGlsZCByb3V0ZSB1bnRpbCBvbmUgb2YgdGhlbSByZXR1cm4gdGhlIHJlc3VsdFxuICAgIGNvbnN0IHJvdXRlID0gYXdhaXQgbmV4dCgpO1xuXG4gICAgLy8gUHJvdmlkZSBkZWZhdWx0IHZhbHVlcyBmb3IgdGl0bGUsIGRlc2NyaXB0aW9uIGV0Yy5cbiAgICByb3V0ZS50aXRsZSA9IGAke3JvdXRlLnRpdGxlIHx8ICdVbnRpdGxlZCBQYWdlJ30gLSB3d3cucmVhY3RzdGFydGVya2l0LmNvbWA7XG4gICAgcm91dGUuZGVzY3JpcHRpb24gPSByb3V0ZS5kZXNjcmlwdGlvbiB8fCAnJztcblxuICAgIHJldHVybiByb3V0ZTtcbiAgfSxcbn07XG5cbi8vIFRoZSBlcnJvciBwYWdlIGlzIGF2YWlsYWJsZSBieSBwZXJtYW5lbnQgdXJsIGZvciBkZXZlbG9wbWVudCBtb2RlXG5pZiAoX19ERVZfXykge1xuICByb3V0ZXMuY2hpbGRyZW4udW5zaGlmdCh7XG4gICAgcGF0aDogJy9lcnJvcicsXG4gICAgYWN0aW9uOiByZXF1aXJlKCcuL2Vycm9yJykuZGVmYXVsdCxcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcztcbiIsIi8qKlxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBjb29raWVQYXJzZXIgZnJvbSAnY29va2llLXBhcnNlcic7XG5pbXBvcnQgYm9keVBhcnNlciBmcm9tICdib2R5LXBhcnNlcic7XG5pbXBvcnQgZXhwcmVzc0p3dCwgeyBVbmF1dGhvcml6ZWRFcnJvciBhcyBKd3Q0MDFFcnJvciB9IGZyb20gJ2V4cHJlc3Mtand0JztcbmltcG9ydCB7IGdyYXBocWwgfSBmcm9tICdncmFwaHFsJztcbmltcG9ydCBleHByZXNzR3JhcGhRTCBmcm9tICdleHByZXNzLWdyYXBocWwnO1xuaW1wb3J0IGp3dCBmcm9tICdqc29ud2VidG9rZW4nO1xuaW1wb3J0IG5vZGVGZXRjaCBmcm9tICdub2RlLWZldGNoJztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tL3NlcnZlcic7XG5pbXBvcnQgUHJldHR5RXJyb3IgZnJvbSAncHJldHR5LWVycm9yJztcbmltcG9ydCBBcHAgZnJvbSAnLi9jb21wb25lbnRzL0FwcCc7XG5pbXBvcnQgSHRtbCBmcm9tICcuL2NvbXBvbmVudHMvSHRtbCc7XG5pbXBvcnQgeyBFcnJvclBhZ2VXaXRob3V0U3R5bGUgfSBmcm9tICcuL3JvdXRlcy9lcnJvci9FcnJvclBhZ2UnO1xuaW1wb3J0IGVycm9yUGFnZVN0eWxlIGZyb20gJy4vcm91dGVzL2Vycm9yL0Vycm9yUGFnZS5jc3MnO1xuaW1wb3J0IGNyZWF0ZUZldGNoIGZyb20gJy4vY3JlYXRlRmV0Y2gnO1xuaW1wb3J0IHBhc3Nwb3J0IGZyb20gJy4vcGFzc3BvcnQnO1xuaW1wb3J0IHJvdXRlciBmcm9tICcuL3JvdXRlcic7XG5pbXBvcnQgbW9kZWxzIGZyb20gJy4vZGF0YS9tb2RlbHMnO1xuaW1wb3J0IHNjaGVtYSBmcm9tICcuL2RhdGEvc2NoZW1hJztcbi8vIGltcG9ydCBhc3NldHMgZnJvbSAnLi9hc3NldC1tYW5pZmVzdC5qc29uJzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBpbXBvcnQvbm8tdW5yZXNvbHZlZFxuaW1wb3J0IGNodW5rcyBmcm9tICcuL2NodW5rLW1hbmlmZXN0Lmpzb24nOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGltcG9ydC9uby11bnJlc29sdmVkXG5pbXBvcnQgY29uZmlnIGZyb20gJy4vY29uZmlnJztcblxucHJvY2Vzcy5vbigndW5oYW5kbGVkUmVqZWN0aW9uJywgKHJlYXNvbiwgcCkgPT4ge1xuICBjb25zb2xlLmVycm9yKCdVbmhhbmRsZWQgUmVqZWN0aW9uIGF0OicsIHAsICdyZWFzb246JywgcmVhc29uKTtcbiAgLy8gc2VuZCBlbnRpcmUgYXBwIGRvd24uIFByb2Nlc3MgbWFuYWdlciB3aWxsIHJlc3RhcnQgaXRcbiAgcHJvY2Vzcy5leGl0KDEpO1xufSk7XG5cbi8vXG4vLyBUZWxsIGFueSBDU1MgdG9vbGluZyAoc3VjaCBhcyBNYXRlcmlhbCBVSSkgdG8gdXNlIGFsbCB2ZW5kb3IgcHJlZml4ZXMgaWYgdGhlXG4vLyB1c2VyIGFnZW50IGlzIG5vdCBrbm93bi5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5nbG9iYWwubmF2aWdhdG9yID0gZ2xvYmFsLm5hdmlnYXRvciB8fCB7fTtcbmdsb2JhbC5uYXZpZ2F0b3IudXNlckFnZW50ID0gZ2xvYmFsLm5hdmlnYXRvci51c2VyQWdlbnQgfHwgJ2FsbCc7XG5cbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcblxuLy9cbi8vIElmIHlvdSBhcmUgdXNpbmcgcHJveHkgZnJvbSBleHRlcm5hbCBtYWNoaW5lLCB5b3UgY2FuIHNldCBUUlVTVF9QUk9YWSBlbnZcbi8vIERlZmF1bHQgaXMgdG8gdHJ1c3QgcHJveHkgaGVhZGVycyBvbmx5IGZyb20gbG9vcGJhY2sgaW50ZXJmYWNlLlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmFwcC5zZXQoJ3RydXN0IHByb3h5JywgY29uZmlnLnRydXN0UHJveHkpO1xuXG4vL1xuLy8gUmVnaXN0ZXIgTm9kZS5qcyBtaWRkbGV3YXJlXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuYXBwLnVzZShleHByZXNzLnN0YXRpYyhwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAncHVibGljJykpKTtcbmFwcC51c2UoY29va2llUGFyc2VyKCkpO1xuYXBwLnVzZShib2R5UGFyc2VyLnVybGVuY29kZWQoeyBleHRlbmRlZDogdHJ1ZSB9KSk7XG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcblxuLy9cbi8vIEF1dGhlbnRpY2F0aW9uXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuYXBwLnVzZShcbiAgZXhwcmVzc0p3dCh7XG4gICAgc2VjcmV0OiBjb25maWcuYXV0aC5qd3Quc2VjcmV0LFxuICAgIGNyZWRlbnRpYWxzUmVxdWlyZWQ6IGZhbHNlLFxuICAgIGdldFRva2VuOiByZXEgPT4gcmVxLmNvb2tpZXMuaWRfdG9rZW4sXG4gIH0pLFxuKTtcbi8vIEVycm9yIGhhbmRsZXIgZm9yIGV4cHJlc3Mtand0XG5hcHAudXNlKChlcnIsIHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgaWYgKGVyciBpbnN0YW5jZW9mIEp3dDQwMUVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignW2V4cHJlc3Mtand0LWVycm9yXScsIHJlcS5jb29raWVzLmlkX3Rva2VuKTtcbiAgICAvLyBgY2xlYXJDb29raWVgLCBvdGhlcndpc2UgdXNlciBjYW4ndCB1c2Ugd2ViLWFwcCB1bnRpbCBjb29raWUgZXhwaXJlc1xuICAgIHJlcy5jbGVhckNvb2tpZSgnaWRfdG9rZW4nKTtcbiAgfVxuICBuZXh0KGVycik7XG59KTtcblxuYXBwLnVzZShwYXNzcG9ydC5pbml0aWFsaXplKCkpO1xuXG5hcHAuZ2V0KFxuICAnL2xvZ2luL2ZhY2Vib29rJyxcbiAgcGFzc3BvcnQuYXV0aGVudGljYXRlKCdmYWNlYm9vaycsIHtcbiAgICBzY29wZTogWydlbWFpbCcsICd1c2VyX2xvY2F0aW9uJ10sXG4gICAgc2Vzc2lvbjogZmFsc2UsXG4gIH0pLFxuKTtcbmFwcC5nZXQoXG4gICcvbG9naW4vZmFjZWJvb2svcmV0dXJuJyxcbiAgcGFzc3BvcnQuYXV0aGVudGljYXRlKCdmYWNlYm9vaycsIHtcbiAgICBmYWlsdXJlUmVkaXJlY3Q6ICcvbG9naW4nLFxuICAgIHNlc3Npb246IGZhbHNlLFxuICB9KSxcbiAgKHJlcSwgcmVzKSA9PiB7XG4gICAgY29uc3QgZXhwaXJlc0luID0gNjAgKiA2MCAqIDI0ICogMTgwOyAvLyAxODAgZGF5c1xuICAgIGNvbnN0IHRva2VuID0gand0LnNpZ24ocmVxLnVzZXIsIGNvbmZpZy5hdXRoLmp3dC5zZWNyZXQsIHsgZXhwaXJlc0luIH0pO1xuICAgIHJlcy5jb29raWUoJ2lkX3Rva2VuJywgdG9rZW4sIHsgbWF4QWdlOiAxMDAwICogZXhwaXJlc0luLCBodHRwT25seTogdHJ1ZSB9KTtcbiAgICByZXMucmVkaXJlY3QoJy8nKTtcbiAgfSxcbik7XG5cbi8vXG4vLyBSZWdpc3RlciBBUEkgbWlkZGxld2FyZVxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmFwcC51c2UoXG4gICcvZ3JhcGhxbCcsXG4gIGV4cHJlc3NHcmFwaFFMKHJlcSA9PiAoe1xuICAgIHNjaGVtYSxcbiAgICBncmFwaGlxbDogX19ERVZfXyxcbiAgICByb290VmFsdWU6IHsgcmVxdWVzdDogcmVxIH0sXG4gICAgcHJldHR5OiBfX0RFVl9fLFxuICB9KSksXG4pO1xuXG4vL1xuLy8gUmVnaXN0ZXIgc2VydmVyLXNpZGUgcmVuZGVyaW5nIG1pZGRsZXdhcmVcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5hcHAuZ2V0KCcqJywgYXN5bmMgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgY3NzID0gbmV3IFNldCgpO1xuXG4gICAgLy8gRW5hYmxlcyBjcml0aWNhbCBwYXRoIENTUyByZW5kZXJpbmdcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20va3JpYXNvZnQvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXJcbiAgICBjb25zdCBpbnNlcnRDc3MgPSAoLi4uc3R5bGVzKSA9PiB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZXJzY29yZS1kYW5nbGVcbiAgICAgIHN0eWxlcy5mb3JFYWNoKHN0eWxlID0+IGNzcy5hZGQoc3R5bGUuX2dldENzcygpKSk7XG4gICAgfTtcblxuICAgIC8vIFVuaXZlcnNhbCBIVFRQIGNsaWVudFxuICAgIGNvbnN0IGZldGNoID0gY3JlYXRlRmV0Y2gobm9kZUZldGNoLCB7XG4gICAgICBiYXNlVXJsOiBjb25maWcuYXBpLnNlcnZlclVybCxcbiAgICAgIGNvb2tpZTogcmVxLmhlYWRlcnMuY29va2llLFxuICAgICAgc2NoZW1hLFxuICAgICAgZ3JhcGhxbCxcbiAgICB9KTtcblxuICAgIC8vIEdsb2JhbCAoY29udGV4dCkgdmFyaWFibGVzIHRoYXQgY2FuIGJlIGVhc2lseSBhY2Nlc3NlZCBmcm9tIGFueSBSZWFjdCBjb21wb25lbnRcbiAgICAvLyBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL2NvbnRleHQuaHRtbFxuICAgIGNvbnN0IGNvbnRleHQgPSB7XG4gICAgICBmZXRjaCxcbiAgICAgIC8vIFRoZSB0d2lucyBiZWxvdyBhcmUgd2lsZCwgYmUgY2FyZWZ1bCFcbiAgICAgIHBhdGhuYW1lOiByZXEucGF0aCxcbiAgICAgIHF1ZXJ5OiByZXEucXVlcnksXG4gICAgfTtcblxuICAgIGNvbnN0IHJvdXRlID0gYXdhaXQgcm91dGVyLnJlc29sdmUoY29udGV4dCk7XG5cbiAgICBpZiAocm91dGUucmVkaXJlY3QpIHtcbiAgICAgIHJlcy5yZWRpcmVjdChyb3V0ZS5zdGF0dXMgfHwgMzAyLCByb3V0ZS5yZWRpcmVjdCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZGF0YSA9IHsgLi4ucm91dGUgfTtcbiAgICBkYXRhLmNoaWxkcmVuID0gUmVhY3RET00ucmVuZGVyVG9TdHJpbmcoXG4gICAgICA8QXBwIGNvbnRleHQ9e2NvbnRleHR9IGluc2VydENzcz17aW5zZXJ0Q3NzfT5cbiAgICAgICAge3JvdXRlLmNvbXBvbmVudH1cbiAgICAgIDwvQXBwPixcbiAgICApO1xuICAgIGRhdGEuc3R5bGVzID0gW3sgaWQ6ICdjc3MnLCBjc3NUZXh0OiBbLi4uY3NzXS5qb2luKCcnKSB9XTtcblxuICAgIGNvbnN0IHNjcmlwdHMgPSBuZXcgU2V0KCk7XG4gICAgY29uc3QgYWRkQ2h1bmsgPSBjaHVuayA9PiB7XG4gICAgICBpZiAoY2h1bmtzW2NodW5rXSkge1xuICAgICAgICBjaHVua3NbY2h1bmtdLmZvckVhY2goYXNzZXQgPT4gc2NyaXB0cy5hZGQoYXNzZXQpKTtcbiAgICAgIH0gZWxzZSBpZiAoX19ERVZfXykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYENodW5rIHdpdGggbmFtZSAnJHtjaHVua30nIGNhbm5vdCBiZSBmb3VuZGApO1xuICAgICAgfVxuICAgIH07XG4gICAgYWRkQ2h1bmsoJ2NsaWVudCcpO1xuICAgIGlmIChyb3V0ZS5jaHVuaykgYWRkQ2h1bmsocm91dGUuY2h1bmspO1xuICAgIGlmIChyb3V0ZS5jaHVua3MpIHJvdXRlLmNodW5rcy5mb3JFYWNoKGFkZENodW5rKTtcblxuICAgIGRhdGEuc2NyaXB0cyA9IEFycmF5LmZyb20oc2NyaXB0cyk7XG4gICAgZGF0YS5hcHAgPSB7XG4gICAgICBhcGlVcmw6IGNvbmZpZy5hcGkuY2xpZW50VXJsLFxuICAgIH07XG5cbiAgICBjb25zdCBodG1sID0gUmVhY3RET00ucmVuZGVyVG9TdGF0aWNNYXJrdXAoPEh0bWwgey4uLmRhdGF9IC8+KTtcbiAgICByZXMuc3RhdHVzKHJvdXRlLnN0YXR1cyB8fCAyMDApO1xuICAgIHJlcy5zZW5kKGA8IWRvY3R5cGUgaHRtbD4ke2h0bWx9YCk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIG5leHQoZXJyKTtcbiAgfVxufSk7XG5cbi8vXG4vLyBFcnJvciBoYW5kbGluZ1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmNvbnN0IHBlID0gbmV3IFByZXR0eUVycm9yKCk7XG5wZS5za2lwTm9kZUZpbGVzKCk7XG5wZS5za2lwUGFja2FnZSgnZXhwcmVzcycpO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbmFwcC51c2UoKGVyciwgcmVxLCByZXMsIG5leHQpID0+IHtcbiAgY29uc29sZS5lcnJvcihwZS5yZW5kZXIoZXJyKSk7XG4gIGNvbnN0IGh0bWwgPSBSZWFjdERPTS5yZW5kZXJUb1N0YXRpY01hcmt1cChcbiAgICA8SHRtbFxuICAgICAgdGl0bGU9XCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIlxuICAgICAgZGVzY3JpcHRpb249e2Vyci5tZXNzYWdlfVxuICAgICAgc3R5bGVzPXtbeyBpZDogJ2NzcycsIGNzc1RleHQ6IGVycm9yUGFnZVN0eWxlLl9nZXRDc3MoKSB9XX0gLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlcnNjb3JlLWRhbmdsZVxuICAgID5cbiAgICAgIHtSZWFjdERPTS5yZW5kZXJUb1N0cmluZyg8RXJyb3JQYWdlV2l0aG91dFN0eWxlIGVycm9yPXtlcnJ9IC8+KX1cbiAgICA8L0h0bWw+LFxuICApO1xuICByZXMuc3RhdHVzKGVyci5zdGF0dXMgfHwgNTAwKTtcbiAgcmVzLnNlbmQoYDwhZG9jdHlwZSBodG1sPiR7aHRtbH1gKTtcbn0pO1xuXG4vL1xuLy8gTGF1bmNoIHRoZSBzZXJ2ZXJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5jb25zdCBwcm9taXNlID0gbW9kZWxzLnN5bmMoKS5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcihlcnIuc3RhY2spKTtcbmlmICghbW9kdWxlLmhvdCkge1xuICBwcm9taXNlLnRoZW4oKCkgPT4ge1xuICAgIGFwcC5saXN0ZW4oY29uZmlnLnBvcnQsICgpID0+IHtcbiAgICAgIGNvbnNvbGUuaW5mbyhgVGhlIHNlcnZlciBpcyBydW5uaW5nIGF0IGh0dHA6Ly9sb2NhbGhvc3Q6JHtjb25maWcucG9ydH0vYCk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG4vL1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmlmIChtb2R1bGUuaG90KSB7XG4gIGFwcC5ob3QgPSBtb2R1bGUuaG90O1xuICBtb2R1bGUuaG90LmFjY2VwdCgnLi9yb3V0ZXInKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXBwO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQGJhYmVsL3BvbHlmaWxsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJvZHktcGFyc2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvb2tpZS1wYXJzZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzLWdyYXBocWxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXhwcmVzcy1qd3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZ3JhcGhxbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJoaXN0b3J5XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImlzb21vcnBoaWMtc3R5bGUtbG9hZGVyL1N0eWxlQ29udGV4dFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJpc29tb3JwaGljLXN0eWxlLWxvYWRlci91c2VTdHlsZXNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwianNvbndlYnRva2VuXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGUtZmV0Y2hcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGFzc3BvcnRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGFzc3BvcnQtZmFjZWJvb2tcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwcmV0dHktZXJyb3JcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicHJvcC10eXBlc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1kb20vc2VydmVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNlcXVlbGl6ZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZXJpYWxpemUtamF2YXNjcmlwdFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1bml2ZXJzYWwtcm91dGVyXCIpOyJdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNoeEJBOzs7Ozs7O0FDQUE7QUFDQTtBQUNBOzs7Ozs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDekZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1RkE7Ozs7Ozs7O0FBU0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQVZBOzs7Ozs7OztBQ2xEQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFNQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSQTs7Ozs7Ozs7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU5BO0FBUUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUhBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU9BO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUFBO0FBREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBO0FBQ0E7QUFEQTtBQURBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVVBO0FBQ0E7QUFDQTtBQUhBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBQUE7QUFDQTtBQVhBO0FBY0E7QUFDQTtBQUNBO0FBRkE7Ozs7Ozs7QUN4RkE7Ozs7Ozs7OztBQVNBO0FBRUEsYUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBU0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBTUE7QUFDQTtBQUNBO0FBR0E7QUFKQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFuQkE7QUEzQkE7Ozs7Ozs7O0FDakJBO0FBQUE7Ozs7Ozs7OztBQXNCQTs7Ozs7O0FBTUE7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBSEE7QUFKQTtBQVdBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBRUE7QUFGQTtBQUhBO0FBU0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDM0VBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7O0FBU0E7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQU1BO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFGQTtBQUtBO0FBQ0E7QUFDQTtBQUZBO0FBWkE7QUFrQkE7QUFBQTtBQUFBO0FBREE7QUFLQTs7Ozs7Ozs7QUNwQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7QUFTQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBREE7QUFJQTtBQUNBO0FBREE7QUFMQTtBQVVBOzs7Ozs7OztBQ3RCQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7OztBQVNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQUNBO0FBRkE7QUFOQTtBQVlBOzs7Ozs7OztBQ3hCQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7OztBQVNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBS0E7QUFDQTtBQURBO0FBSUE7QUFDQTtBQURBO0FBSUE7QUFDQTtBQURBO0FBSUE7QUFDQTtBQURBO0FBSUE7QUFDQTtBQURBO0FBdEJBO0FBMkJBOzs7Ozs7OztBQ3ZDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7O0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7Ozs7Ozs7OztBQ3hDQTtBQUFBO0FBQUE7Ozs7Ozs7O0FBU0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFGQTtBQUtBO0FBQ0E7QUFWQTtBQVlBOzs7Ozs7OztBQ3ZCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBSUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFqQ0E7QUFtQ0E7Ozs7Ozs7O0FDekRBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7Ozs7QUFTQTtBQUtBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUZBO0FBREE7QUFVQTs7Ozs7Ozs7QUMzQkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7OztBQVNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRkE7QUFPQTs7Ozs7Ozs7QUNuQkE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7O0FBU0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFMQTtBQUZBO0FBV0E7Ozs7Ozs7O0FDMUJBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7OztBQVNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBRkE7QUFGQTtBQVFBOzs7Ozs7OztBQ3hCQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7OztBQVNBOzs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7QUFHQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBUUE7QUFaQTtBQWVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUZBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFMQTtBQVlBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBSkE7QUFRQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFKQTtBQUNBO0FBV0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFEQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBTEE7QUFZQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUpBO0FBUUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUlBOzs7Ozs7OztBQzFJQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7OztBQVNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQVpBOzs7Ozs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2QkE7Ozs7Ozs7O0FBU0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFDQTtBQUNBO0FBRUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFEQTtBQVFBO0FBQ0E7QUFEQTtBQUlBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQy9DQTs7Ozs7Ozs7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUZBO0FBSUE7QUFDQTtBQUNBOzs7Ozs7OztBQ25CQTtBQUFBOzs7Ozs7Ozs7QUFTQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBLG9VQUFBO0FBRkE7QUFLQTtBQUNBLDZVQUFBO0FBRkE7QUFLQTtBQUNBLHVVQUFBO0FBRkE7QUFLQTtBQUNBLGdWQUFBO0FBRkE7QUFLQTtBQUNBLHVVQUFBO0FBRkE7QUFLQTtBQUNBLDZVQUFBO0FBRkE7QUFLQTtBQUNBLHVVQUFBO0FBRkE7QUFNQTtBQUNBO0FBQ0EsbVZBQUE7QUFGQTtBQUNBO0FBS0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQW5EQTtBQUNBO0FBcURBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pFQTs7Ozs7Ozs7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFHQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUhBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUVBO0FBRUE7QUFHQTtBQUNBO0FBRkE7QUFLQTtBQUdBO0FBQ0E7QUFGQTtBQUtBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUpBO0FBU0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQVFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBREE7QUFJQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBSEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQSxhQU1BO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzFPQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7Ozs7OztBQ0FBOzs7Ozs7O0FDQUE7Ozs7Ozs7QUNBQTs7OztBIiwic291cmNlUm9vdCI6IiJ9