import React, { Component } from "react"
import * as pdfjs from "pdfjs-dist/webpack"
import { PDFViewer, PDFFindController, PDFLinkService, EventBus } from "pdfjs-dist/web/pdf_viewer.js"

import PropTypes from "prop-types"
import i18n from "@cirrus/legacy/features/core/shared/utils/i18n"
import styles from "./viewer.less"
import Button from "@cirrus/legacy/app-components/buttons/button"

class Viewer extends Component {
  static propTypes = {
    src: PropTypes.string,
    onChangePage: PropTypes.func,
    onSetNumPages: PropTypes.func,
    loader: PropTypes.element,
  }

  _scaleDefaultInfo = {
    defaultScaleDelta: 1.5,
    minScale: 0.1,
    maxScale: 10.0,
    defaultScale: "page-width",
  }
  _viewerContainer = null
  _pdf = null
  state = {
    pending: false,
    errorMessage: null,
  }

  componentDidUpdate(prevProps) {
    const { src } = this.props
    if (prevProps.src !== src) {
      if (src) {
        this._setDocument(src)
      } else {
        this._destroyPdf()
      }
    }
  }

  componentDidMount() {

    const eventBus = new EventBus()

    const linkService = new PDFLinkService({
      eventBus,
    })

    const findController = new PDFFindController({
      eventBus,
      linkService,
    })

    this._eventBus = eventBus

    this._pdfViewer = new PDFViewer({
      eventBus,
      linkService,
      findController,
      container: this._viewerContainer,
    })

    linkService.setViewer(this._pdfViewer);

    this._viewerContainer.addEventListener("pagechange", this._changePage)
    this._viewerContainer.addEventListener("pagesinit", this._initPages)

    if (this.props.src) {
      this._setDocument(this.props.src)
    }
  }

  componentWillUnmount() {
    this._viewerContainer.removeEventListener("pagechange", this._changePage)
    this._viewerContainer.removeEventListener("pagesinit", this._initPages)
    this._destroyPdf()
  }

  errorMessageComponent(errorMessage) {
    return (
      <div className={styles.errorMessageContainer}>
        <p className={styles.errorMessageText}>{errorMessage}</p>
        <Button
          className={styles.errorButton}
          onClick={() => {
            this._setDocument(this.props.src)
          }}>
          {i18n("General:TryAgain")}
        </Button>
      </div>
    )
  }

  _setDocument = (src) => {
    this.setState({ errorMessage: null })
    this.setState({ pending: true })
    setTimeout(
      () =>
        pdfjs
          .getDocument(src)
          .promise.then((pdf) => {
            this._destroyPdf()
            this._pdfViewer.setDocument(pdf)
            this._pdf = pdf

            this.props.onSetNumPages && this.props.onSetNumPages(pdf.numPages)
            this.setState({ pending: false })
          })
          .catch(() => {
            this._destroyPdf()
            this._pdfViewer.setDocument(null)
            this.setState({ pending: false })
            this.setState({
              errorMessage: i18n("Notification.Messages:ErrorOccurredDuringDataLoading"),
            })
          }),
      100, // for some reason worker isn't available to load it immediately
    )
  }

  _destroyPdf = () => {
    this._pdf && this._pdf.destroy()
    this._pdf = null
  }

  _changePage = ({ pageNumber }) => {
    const { onChangePage } = this.props
    onChangePage && onChangePage(pageNumber)
  }

  _initPages = () => {
    this._pdfViewer.currentScaleValue = this._scaleDefaultInfo.defaultScale
  }

  _find = (options) => {
    console.log(`[PDF-FIND]`)
    console.log(options)
    this._eventBus.dispatch("find", {
      source: window,
      caseSensitive: false,
      findPrevious: false,
      highlightAll: true,
      phraseSearch: true,
      entireWord: false,
      matchDiacritics: true,
      ...options,
    })
  }

  find = (query, options) => this._find({ type: "", query })
  findAgain = (query, options) => this._find({ type: "again", query })

  zoomDown = () => {
    let newScale = this._pdfViewer.currentScale

    newScale = (newScale / this._scaleDefaultInfo.defaultScaleDelta).toFixed(2)
    newScale = Math.ceil(newScale * 10) / 10
    newScale = Math.max(this._scaleDefaultInfo.minScale, newScale)

    this._pdfViewer.currentScaleValue = newScale
  }

  zoomUp = () => {
    let newScale = this._pdfViewer.currentScale

    newScale = (newScale * this._scaleDefaultInfo.defaultScaleDelta).toFixed(2)
    newScale = Math.floor(newScale * 10) / 10
    newScale = Math.min(this._scaleDefaultInfo.maxScale, newScale)

    this._pdfViewer.currentScaleValue = newScale
  }

  fitWidth = () => {
    this._pdfViewer.currentScaleValue = this._scaleDefaultInfo.defaultScale
  }

  goToPage = (pageNumber) => {
    this._pdfViewer.currentPageNumber = Number(pageNumber)
  }

  render() {
    return (
      <div
        ref={(element) => (this._viewerContainer = element)}
        className={`pdf-viewer ${this.state.errorMessage ? styles.viewerError : ""}`}>
        {this.state.pending && this.props.loader ? this.props.loader : null}
        {this.state.errorMessage ? this.errorMessageComponent(this.state.errorMessage) : null}
        <div id="viewer" className="pdfViewer" />
      </div>
    )
  }
}

export default Viewer
