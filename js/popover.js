/**
 * Created by turner on 9/19/14.
 */
var igv = (function (igv) {

    igv.Popover = function (trackView) {

        this.trackView = trackView;
        this.markupWithParentDiv(trackView.contentDiv);

    };

    igv.Popover.prototype.markupWithParentDiv = function (parentDiv) {

        var popoverDiv,
            popoverCloseDiv;

        popoverDiv = document.createElement('div');
        parentDiv.appendChild(popoverDiv);

        this.popoverDiv = popoverDiv;

        popoverDiv.id = "popover_" + igv.guid();
        popoverDiv.className = "popover";
        popoverDiv.innerHTML = "hello popover";

        popoverCloseDiv = document.createElement("div");
        popoverDiv.appendChild(popoverCloseDiv);

        popoverCloseDiv.className = "popoverClose";
        popoverCloseDiv.innerHTML = "x";

    };

    igv.Popover.prototype.onmousedown = function (event, dx, dy) {

        this.mouseDownX = dx;
        this.mouseDownY = dy;

        $(this.popoverDiv).hide();

    };

    igv.Popover.prototype.onmouseup = function (event, dx, dy) {

        var threshX = dx - this.mouseDownX,
            threshY = dy - this.mouseDownY,
            thresh,
            genomicLocation,
            trackType,
            base,
            index,
            coverageMap = this.trackView.track.featureSource.alignmentManager.coverageMap,
            refSeq = coverageMap.refSeq;

        trackType = (this.trackView.track instanceof igv.BAMTrack) ? "BAMTrack " : "UnknownTrack";
        genomicLocation = this.trackView.genomicCoordinateWithEventTap(event);

        index = genomicLocation - coverageMap.bpStart;
        base = refSeq[ index ];

        thresh = Math.floor( Math.sqrt(threshX * threshX + threshY * threshY) );
        if (thresh < 6) {

            this.popoverDiv.innerHTML = "Track " + trackType + " base " + base + " location " + igv.numberFormatter(genomicLocation);

            $(this.popoverDiv).css({
                "left": dx + "px",
                "top" : dy + "px"
            }).show();

        }

        this.mouseDownX = this.mouseDownY = undefined;

    };

    return igv;

})(igv || {});
