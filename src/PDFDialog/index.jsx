import React, { Component, Fragment } from "react"
import T from "prop-types"
import classnames from "classnames"
import { debounce } from "lodash"
import i18n from "@cirrus/legacy/app-common/alt/framework/i18n.js"

import Icon from "@cirrus/legacy/app-components/icons/icon/index.jsx"
import Spinner from "@cirrus/legacy/app-components/spinner/spinner/index.jsx"
import { NumberInput } from "@cirrus/legacy/app-components/entries/lib.js"

import ResizablePdfDialog from "../dialog/index.jsx"
import Viewer from "./viewer.jsx"
import PdfSearch from "./search.jsx"

import styles from "./index.less"

class PDFDialog extends Component {
  static propTypes = {
    src: T.string.isRequired,
    isOpen: T.bool.isRequired,
    isAnswerLocked: T.bool,
    onClose: T.func,
    isHidden: T.bool,
    onClickInside: T.func,
    zIndex: T.number,
  }

  state = {
    currentPage: "1",
    numPages: "",
    search: "",
    isInputFocused: false,
    isSearchFocused: false,
    isSearchOpened: false,
  }
  pdfViewer = null
  debouncedFit = debounce(() => this.pdfViewer.fitWidth(), 300)
  debouncedSearch = debounce((search) => this.pdfViewer.find(search), 300)

  onZoomDown = () => this.pdfViewer.zoomDown()
  onZoomUp = () => this.pdfViewer.zoomUp()
  onFitWidth = () => this.pdfViewer.fitWidth()

  onSearch = (e, search) => {
    this.setState({ search }, () => this.debouncedSearch(this.state.search))
  }

  onPrevMatch = () => this.pdfViewer.findAgain(this.state.search, { findPrevious: true })
  onNextMatch = () => this.pdfViewer.findAgain(this.state.search)

  onPageChangeFocus = () =>
    this.setState({
      isInputFocused: true,
    })

  onPageBlurFocus = () =>
    this.setState({
      isInputFocused: false,
    })

  onPageChange = (e, value) => {
    this.setState({
      currentPage: String(value),
    })

    if (value < 1 || value > this.state.numPages) {
      return
    }
    this.pdfViewer.goToPage(value)
  }

  updatePageNumber = (pageNumber) =>
    this.setState({
      currentPage: String(pageNumber),
    })

  setNumPages = (numPages) => this.setState({ numPages })

  render() {
    const {
      isOpen,
      onClose,
      isHidden,
      isAnswerLocked,
      onClickInside,
      onToggleCollapse,
      onToggleExpand,
      isExpanded,
      updateDialogRect,
      zIndex,
      dialogRect,
    } = this.props

    const { isSearchOpened } = this.state

    const headerContent = (
      <Fragment>
        <PdfSearch
          {...{ isAnswerLocked }}
          search={this.state.search}
          onSearch={this.onSearch}
          onPrevMatch={this.onPrevMatch}
          onNextMatch={this.onNextMatch}
          onSearchToggle={(isSearchOpened) => this.setState({ isSearchOpened })}
          isOpened={isSearchOpened}
          onSearchInputToggle={(isSearchFocused) => this.setState({ isSearchFocused })}
          isFocused={isSearchOpened}
        />

        <Icon
          icon={"icon-window-minimize1"}
          onClick={onToggleCollapse}
          className={classnames(styles.headerIcon, styles.minimizeIcon)}
        />

        <Icon
          icon={isExpanded ? "icon-shrink7" : "icon-enlarge7"}
          onClick={() => onToggleExpand(!isExpanded)}
          className={classnames(styles.headerIcon, styles.expandIcon)}
        />
      </Fragment>
    )

    const footerContent = (
      <div>
        <div
          className={classnames({
            [styles.inputFocused]: this.state.isInputFocused,
          })}>
          <div className={styles.controls}>
            <div className={styles.section}>
              <span className={styles.pager}>
                {i18n("General:Page")}
                <NumberInput
                  dataQa="pdf-input-page"
                  type="int"
                  className={styles.input}
                  forbidNegative
                  onFocus={this.onPageChangeFocus}
                  onBlur={this.onPageBlurFocus}
                  notValid={
                    Boolean(this.state.numPages) &&
                    (this.state.currentPage < 1 || this.state.currentPage > this.state.numPages)
                  }
                  value={this.state.currentPage}
                  onChange={this.onPageChange}
                />
                / <span className={styles.pagerNumber}>{this.state.numPages}</span>
              </span>
            </div>

            <div className={styles.section}>
              <Icon icon={"fa-plus"} onClick={this.onZoomUp} className={styles.icon} />

              <Icon
                icon={"icon-expand3"}
                onClick={this.onFitWidth}
                className={classnames(styles.icon, styles.fitWidth)}
              />

              <Icon
                icon={"fa-minus"}
                onClick={this.onZoomDown}
                className={classnames(styles.icon)}
              />
            </div>
          </div>
        </div>
      </div>
    )

    return (
      <ResizablePdfDialog
        active={isOpen}
        hideFooter={true}
        aboveHeaderContent={headerContent}
        footerContent={footerContent}
        containerClassName={styles.container}
        className={styles.dialog}
        isHidden={isHidden}
        onRequestClose={onClose}
        dialogRight={60}
        dialogTop={160}
        hasOuterScrollX={true}
        onResize={() => {
          onToggleExpand(false)
          this.debouncedFit()
        }}
        onToggle={(isExpanded) => {
          onToggleExpand(isExpanded)
          this.pdfViewer.fitWidth()
        }}
        hasPerfectScrollbar={false}
        isExpanded={isExpanded}
        onClickInside={onClickInside}
        dialogRect={dialogRect}
        updateDialogRect={updateDialogRect}
        zIndex={zIndex}>
        <div id="pdf-container" className={classnames("pdf-context", styles.pdfContainer)}>
          <Viewer
            src={this.props.src}
            ref={(viewer) => (this.pdfViewer = viewer)}
            onChangePage={this.updatePageNumber}
            onSetNumPages={this.setNumPages}
            loader={
              <div className={styles.spinnerContainer}>
                <Spinner />
              </div>
            }
          />
        </div>
      </ResizablePdfDialog>
    )
  }
}

export default PDFDialog
